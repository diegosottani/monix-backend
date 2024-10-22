import { supabase } from '../../../init.js';

export const put_user_incomings = async (req, res) => {
  try {
    const incomingsId = req.params.id;

    const updatedIncomings = {
      date: req.body.date,
      value: req.body.value,
      member_id: req.body.member,
      frequency: req.body.frequency,
      category_id: req.body.category,
      description: req.body.description,
      account_id: req.body.account,
      status: req.body.status,
      periodicity: req.body.periodicity,
      quantity: req.body.quantity,
      payment_confirmed: req.body.payment_confirmed
    }

    const { error } = await supabase
      .from('incomings')
      .update(updatedIncomings)
      .eq('id', incomingsId);

    if (error) throw error;

    return res.status(200).send("Entrada atualizada com sucesso");
  } catch (error) {
    console.error('Erro ao atualizar entrada:', error);
    return res.status(500).json({ error: 'Erro ao atualizar entrada' });
  }
};