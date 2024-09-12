import { supabase } from "../init";

export const post_reset_password = async (req, res) => {
  try {
    const email = req.body.email;
    
    if(!email) {
      res.status(400).json({ error: 'É necessário informar o email' });
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'monix://changePassword',
    });
    
    if (error) throw error;

    res.status(200).send("Link de enviado para email");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}
