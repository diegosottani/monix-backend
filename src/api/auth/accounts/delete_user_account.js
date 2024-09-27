import { supabase } from '../../../init.js';
import { accountOnDefault } from '../../../database/updateDefaultOnDelete.js'

export const delete_account = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ error: 'O ID da conta é obrigatório' });
    }
    
    await accountOnDefault(id);

    const { error } = await supabase
      .from('accounts')
      .delete()
      .eq('id', id);

    if (error) throw error;

    res.status(200).json({ message: 'Conta deletada com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar conta:', error);
    res.status(500).json({ error: 'Erro ao deletar conta' });
  }
};
