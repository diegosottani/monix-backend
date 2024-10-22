import { supabase } from '../../../init.js';
import { groupByDate } from "../../../utils/groupByDate.js";

export const get_user_incomings = async (req, res) => {
  try {
    const startDate = req.query.start_date;
    const endDate = req.query.end_date;
    const { data, error } = await supabase
      .from('incomings')
      .select(`
        id,
        user_id,
        date,
        value,
        member_id (id, name),
        frequency,
        category_id (id, name),
        description,
        account_id (id, name),
        status,
        periodicity,
        quantity,
        type
    `)
      .eq('user_id', req.user.id)
      .neq("payment_confirmed", false)
      .gte("date", startDate)
      .lte("date", endDate)
      .order("date", { ascending: true });

    if (error) throw error;
    return res.status(200).json(groupByDate(data));
  } catch (error) {
    console.error('Erro ao buscar entradas:', error);
    return res.status(500).json({ error: 'Erro ao buscar entradas' });
  }
};