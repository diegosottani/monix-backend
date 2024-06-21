import { supabase } from '../../../init';

export const post_user_expenses = async (req, res) => {
  try {
    if (!req.body.date 
      || !req.body.value
      || !req.body.member
      || !req.body.frequency 
      || !req.body.category
      || !req.body.subcategory
      || !req.body.expenseType
      || !req.body.description
      || !req.body.account
      || !req.body.status
    ) {
      res.status(400).json({ error: 'É necessário preencher todos os campos' });
    }
    let query = await supabase 
      .from('expenses')
      .insert({
        user_id: req.user.id,
        date: req.body.date,
        value: req.body.value,
        member_id: req.body.member,
        frequency: req.body.frequency,
        category_id: req.body.category,
        subcategory_id: req.body.subcategory,
        expense_type: req.body.expenseType,
        description: req.body.description,
        account_id: req.body.account,
        status: req.body.status,
        periodicity: req.body.periodicity,
        quantity: req.body.quantity
      });
    let error = query["error"]
    if (error) {
      throw error;
    }
    res.status(201).send("Despesa criada com sucesso");
  } catch (error) {
    console.error('Erro ao criar despesa:', error);
    res.status(500).json({ error: 'Erro ao criar despesa' });
  }
};
