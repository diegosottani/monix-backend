import { supabase } from "../init";

export const put_new_password = async (req, res) => {
  try {
    const password = req.body.password;
    if(!password) {
      res.status(400).json({ error: 'É necessário informar a senha' });
    }

    await supabase.auth.updateUser({ password });
    
    if (error) throw error;

    res.status(201).send("Senha atualizada com sucesso");
  } catch (error) {
    console.log(error);
    res.status(500).send("Erro ao atualizar senha");
  }
}
