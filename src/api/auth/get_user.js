import { supabase } from '../../init';

export const get_user = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', req.user.id)

    if (error) throw error;

    res.status(200).json(data);
  } catch (error) {
    console.error('Erro ao obter dados de usuário:', error);
    res.status(500).json(error);
  }
}