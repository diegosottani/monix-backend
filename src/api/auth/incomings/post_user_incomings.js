import { supabase } from '../../../init';
import { calculateNextDate } from '../../../utils/calculateNextDate';
import { untilEndYear } from '../../../utils/untilEndYear';

export const post_user_incomings = async (req, res) => {
  try {
    if (!req.body.date
      || !req.body.value 
      || !req.body.member
      || !req.body.frequency 
      || !req.body.category
      || !req.body.description
      || !req.body.account
      || !req.body.status
    ) {
      res.status(400).json({ error: 'É necessário preencher todos os campos' });
      return;
    }

    const entries = [];

    if (req.body.periodicity && req.body.quantity) {
      let currentDate = new Date(req.body.date);

      for (let i = 0; i <= req.body.quantity; i++) {
        entries.push({
          user_id: req.user.id,
          date: currentDate.toISOString().split("T")[0], // Format date as yyyy-mm-dd
          value: req.body.value,
          member_id: req.body.member,
          frequency: req.body.frequency,
          category_id: req.body.category,
          description: req.body.description,
          account_id: req.body.account,
          status: req.body.status,
          periodicity: req.body.periodicity,
          quantity: req.body.quantity
        });
        currentDate = calculateNextDate(currentDate, periodicity);
      }
    } else if (req.body.frequency == "Fixo mensal") {
      let currentDate = new Date(req.body.date);
      
      for (let i = 0; i <= untilEndYear(currentDate); i++) {
        entries.push({
          user_id: req.user.id,
          date: currentDate.toISOString().split("T")[0], // Format date as yyyy-mm-dd
          value: req.body.value,
          member_id: req.body.member,
          frequency: req.body.frequency,
          category_id: req.body.category,
          description: req.body.description,
          account_id: req.body.account,
          status: req.body.status,
          periodicity: req.body.periodicity,
          quantity: req.body.quantity
        });
        currentDate = calculateNextDate(currentDate, "Mensal");
      }
    } else {
      entries.push({
        user_id: req.user.id,
        date: req.body.date,
        value: req.body.value,
        member_id: req.body.member,
        frequency: req.body.frequency,
        category_id: req.body.category,
        description: req.body.description,
        account_id: req.body.account,
        status: req.body.status,
      });
    }

    const { error } = await supabase.from("incomings").insert(entries);

    if (error) throw error;

    res.status(201).send("Entrada criada com sucesso");
  } catch (error) {
      console.error('Erro ao criar entrada:', error);
      res.status(500).json({ error: 'Erro ao criar entrada' });
  }
}