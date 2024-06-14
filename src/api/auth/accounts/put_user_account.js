import { supabase } from '../../../init';

export const put_account = async (req, res) => {
  try {
    const id = req.params.id;
    const { user_id, name, active } = req.body;

    if (!id) {
      return res.status(400).json({ error: 'O ID da conta é obrigatório' });
    }

    if (!user_id && !name) {
      return res.status(400).json({ error: 'Pelo menos um dos campos user_id ou name deve ser fornecido' });
    }
    
    const { data, error } = await supabase
      .from('accounts')
      .update({ user_id, name, active })
      .eq('id', id);

    if (error) throw error;

    res.status(200).json({ message: 'Conta atualizada com sucesso', data });
  } catch (error) {
    console.error('Erro ao atualizar conta:', error);
    res.status(500).json({ error: 'Erro ao atualizar conta' });
  }
};
