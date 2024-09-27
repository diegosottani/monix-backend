import { supabase } from '../../../init.js';

export const get_accounts = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('accounts')
      .select('*')
      .eq("user_id", req.user.id)
      .eq("active", req.params.active)

    if (error) throw error;

    res.status(200).json(data);
  } catch (error) {
    console.error('Erro ao obter contas:', error);
    res.status(500).json({ error: 'Erro ao obter contas' });
  }
};
