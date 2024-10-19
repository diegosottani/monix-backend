import { supabase } from '../../../init.js';

export const put_user_expenses = async (req, res) => {
  try {
    const expenseId = req.params.id;
    const updatedExpense = {
      user_id: req.user.id,
      date: req.body.date,
      value: req.body.value,
      member_id: req.body.member,
      frequency: req.body.frequency,
      periodicity: req.body.periodicity,
      quantity: req.body.quantity,
      category_id: req.body.category,
      subcategory_id: req.body.subcategory,
      expense_type: req.body.expenseType,
      description: req.body.description,
      account_id: req.body.account,
      card_id: req.body.card,
      status: req.body.status,
    };

    const { error } = await supabase
      .from('expenses')
      .update(updatedExpense)
      .eq('id', expenseId);

    if (error) {
      throw error;
    }

    return res.status(200).send("Despesa atualizada com sucesso");
  } catch (error) {
    console.error('Erro ao atualizar despesa:', error);
    return res.status(500).json({ error: 'Erro ao atualizar despesa' });
  }
};
