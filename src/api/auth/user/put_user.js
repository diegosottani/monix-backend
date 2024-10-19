import { supabase } from '../../../init.js';

export const put_user = async (req, res) => {
  try {
    const id = req.user.id;
    const { name, phone, birth_date } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'O nome do usuário é obrigatório' });
    }

    const { error } = await supabase
      .from('users')
      .update({ name, phone, birth_date })
      .eq('id', id);

    if (error) throw error;

    return res.status(200).send("Dados do usuário atualizados com sucesso");
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    return res.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
};
