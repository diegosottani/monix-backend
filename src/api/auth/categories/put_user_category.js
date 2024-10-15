import { supabase } from '../../../init.js';

export const put_user_category = async (req, res) => {
  try {
    const id = req.params.id;
    const name = req.body.name;

    if (!name) {
      return res.status(400).json({ error: 'O nome da categoria é obrigatório' });
    }

    const { error } = await supabase
    .from('categories')
    .update({ name: name })
    .eq('id', id)

    if (error) throw error;

    return res.status(200).send("Nome de categoria alterado com sucesso")
  } catch (error) {
    console.error('Erro ao atualizar categoria:', error);
    return res.status(500).json({ error: 'Erro ao atualizar categoria' });
  }
};