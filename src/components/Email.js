// In your Email component file
import { useState } from 'react';
import emailjs from '@emailjs/browser'

function Email({points}) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');






// Lógica para lidar com o envio do formulário
    function sendEmail (e){
        e.preventDefault();

        if(name==="" || email===""|| message ===""){
            alert("Preencha todos os campos");
            return;
        }

        const templateParams = {
            from_name: name,
            message: message,
            email:email,
            points: points
        }
        emailjs.send("service_jymcznx", "template_3azsibq", templateParams, "qtX010Fpf84UJaVav").then((response) => {
            console.log("EMAIL ENVIADO", response.status, response.text)
            setName("")
            setEmail("")
            setMessage("")

        } ,(erro) => {console.log("Erro: ",erro)})
    }




  //Visual do formulário
    return (
    <div className="email-container">
        <div className="inner-container">
        <h3>    Enviar Comentário    </h3>
        <form className="form" onSubmit={sendEmail}>
            <input
            className="input"
            type="text"
            placeholder="Digite seu nome"
            onChange={(e) => setName(e.target.value)}
            value={name}
        />

        <input
            className="input"
            type="text"
            placeholder="Digite seu email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
        />

        <textarea
            className="textarea"
            placeholder="Digite sua mensagem..."
            onChange={(e) => setMessage(e.target.value)}
            value={message}
        />

        <input className="button" type="submit" value="Enviar" />
        </form>
    </div>
    </div>
    );
}

export default Email;
