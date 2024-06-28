import { supabase } from '../../../init';
import { groupByDate } from "../../../utils/groupByDate";

export const get_user_expenses = async (req, res) => {
  try {
    const startDate = req.query.start_date;
    const endDate = req.query.end_date;
    const { data, error } = await supabase
      .from('expenses')
      .select(`
        id,
        user_id,
        category_id (
          id,
          name
        ),
        subcategory_id (
          id, 
          name
        ),
        member_id (
          id,
          name
        ),
        account_id (
          id, 
          name
        ),
        expense_type,
        date,
        value,
        description,
        frequency,
        periodicity,
        quantity,
        status,
        type
      `)
      .eq('user_id', req.user.id)
      .gte("date", startDate)
      .lte("date", endDate)
      .order("date", { ascending: true });

    if (error) {
      throw error;
    }
    res.status(200).send(groupByDate(data));
  } catch (error) {
    console.error('Erro ao recuperar despesas:', error);
    res.status(500).json({ error: 'Erro ao recuperar despesas' });
  }
};
