import { supabase } from "../init.js";

export const post_reset_password = async (req, res) => {
  try {
    const email = req.body.email;
    
    if(!email) {
      return res.status(400).json({ error: 'É necessário informar o email' });
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email);
    
    if (error) throw error;

    return res.status(200).send("Link de enviado para email");
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}
