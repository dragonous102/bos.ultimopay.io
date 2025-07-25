import nodemailer from 'nodemailer';

export default async (req, res) => {
  const {currency , address, amount, email } = req.body;

  const transporter = nodemailer.createTransport({
    host: 'mail.privateemail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'contact@ultimopay.io',
      pass: 'Yqw8z3XmJU',
    },
  });
 

  const mailOptions = {
    from: 'contact@ultimopay.io',
    to: email,
    subject: '[BOS]Withdrawal Confirmation',
    html: `Hello Sir/Ma'am,<br/>
Please reply <b>"I confirm"</b> to process your withdrawal request below.<br/>

Withdrawal address: ${address}<br/>
Withdrawal amount: ${amount} ${currency}<br/>

If you failed to reply within 30 minutes, we will consider the request void.<br/>
Your confirmed withdrawal transaction will be approved and processed at 9:00AM UTC.<br/>

Best regards,<br/>
Ultimo Team<br/>
`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
