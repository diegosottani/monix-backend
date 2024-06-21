import { supabase } from '../../../init';

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
    const {error} = await supabase 
      .from('incomings')
      .insert({
        user_id: req.user.id,
        date: req.body.date,
        value: req.body.value,
        member_id: req.body.member,
        frequency: req.body.frequency,
        category_id: req.body.category,
        subcategory_id: req.body.subcategory || null,
        description: req.body.description,
        account_id: req.body.account,
        status: req.body.status,
        periodicity: req.body.periodicity || null,
        quantity: req.body.quantity || null
      });
    if (error) throw error;

    res.status(201).send("Entrada criada com sucesso");
    } catch (error) {
      console.error('Erro ao criar entrada:', error);
      res.status(500).json({ error: 'Erro ao criar entrada' });
    }
}