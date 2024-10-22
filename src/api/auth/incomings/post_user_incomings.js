import { supabase } from '../../../init.js';
import { calculateNextDate } from '../../../utils/calculateNextDate.js';

export const post_user_incomings = async (req, res) => {
  try {
    if (!req.body.date
      || !req.body.value 
      || !req.body.member
      || !req.body.frequency 
      || !req.body.category
      || !req.body.account
    ) {
      return res.status(400).json({ error: 'É necessário preencher todos os campos' });
    }

    const { data: incoming, error: errorIncoming } = await supabase.from('incomings').insert({
      user_id: req.user.id,
      date: req.body.date,
      value: req.body.value,
      member_id: req.body.member,
      frequency: req.body.frequency,
      category_id: req.body.category,
      description: req.body.description,
      account_id: req.body.account,
      status: req.body.status,
      payment_confirmed: req.body.hasOwnProperty('frequency') ? (req.body.frequency == "Nao recorrente" ? true : false) : undefined
    }).select('id');

    if (errorIncoming) throw errorIncoming;

    const entries = [];

    if (req.body.periodicity && req.body.quantity) {
      let currentDate = new Date(req.body.date);
      for (let i = 0; i < req.body.quantity; i++) {
        entries.push({
          date: currentDate.toISOString().split('T')[0], // Formatar a data como yyyy-mm-dd
          incoming_id: incoming.id
        });
        currentDate = calculateNextDate(currentDate, periodicity);
      }
    } else if (req.body.frequency == "Fixo mensal") {
      const currentDate = new Date(req.body.date);
      const nextMonth = calculateNextDate(currentDate, "Mensal");
      entries.push({
        date: nextMonth.toISOString().split('T')[0], // Formatar a data como yyyy-mm-dd
        incoming_id: incoming.id
      });
    }

    const { error } = await supabase.from("queue").insert(entries);

    if (error) throw error;

    return res.status(201).send("Entrada criada com sucesso");
  } catch (error) {
      console.error('Erro ao criar entrada:', error);
      return res.status(500).json({ error: 'Erro ao criar entrada' });
  }
}