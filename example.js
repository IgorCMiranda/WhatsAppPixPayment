const { Client, Location, List, Buttons, LocalAuth } = require('./index');
const WebSocket = require('ws');
const axios = require('axios'); // Certifique-se de que você tenha a biblioteca axios instalada
const fs = require('fs');


const qrcode = require('qrcode-terminal');
const MessageMedia = require('whatsapp-web.js/src/structures/MessageMedia');

const client = new Client({
    authStrategy: new LocalAuth(),
    // proxyAuthentication: { username: 'username', password: 'password' },
    puppeteer: {
        args: ['--no-sandboxm', '--disable-setuid-sandbox'],
        headless: false
    }
});

client.initialize();

client.on('loading_screen', (percent, message) => {
    console.log('LOADING SCREEN', percent, message);
});

client.on('qr', (qr) => {
    // NOTE: This event will not be fired if a session is specified.
    console.log('QR RECEIVED', qr);
});

client.on('authenticated', () => {
    console.log('AUTHENTICATED');
});

client.on('auth_failure', msg => {
    // Fired if session restore was unsuccessful
    console.error('AUTHENTICATION FAILURE', msg);
});

client.on('ready', () => {
    console.log('READY');
});


const audioArray = [];
const fotoArray = [];

prosseguir = false
vamosla = false
pixgerado = false
naopassou = false
let status; // Declara a variável status no escopo global
let status_time; // Declara a variável status no escopo global
let volta = '';




client.on('message', async msg => {
    console.log('MESSAGE RECEIVED', msg);

    async function liberado(){
        await client.sendMessage(msg.from, "Passo 1 - \nSe você não tem conta no Kwai, crie uma agora! Pra facilitar sua vida, você pode entrar direto nesse link:")
        await client.sendMessage(msg.from, "https://kwai-video.com/f/ZdTpidW1", { linkPreview: true })

        await client.sendMessage(msg.from, "👇🏼 --- Proximo passo --- 👇🏼\n\nPasso 2 -\nAgora que você já tem a conta, precisamos alimentar ela e fazer seu perfil crescer um pouco. Pra isso, vamos postar algum video que chame a atençao.")

        await client.sendMessage(msg.from, "👇🏼 --- Proximo passo --- 👇🏼\n\nPasso 3 -\nEntre nesse canal do youtube:")
        await client.sendMessage(msg.from, "https://www.youtube.com/ @GeniusGifts", { linkPreview: true })
        await client.sendMessage(msg.from, "Escolha algum video shorts que tem nesse perfil")

        await client.sendMessage(msg.from, "👇🏼 --- Proximo passo --- 👇🏼\n\nPasso 4 -\nCopie o link do video e jogue nesse site para baixar:")
        await client.sendMessage(msg.from, "https://ytshorts.savetube.me/pt/ 7?id=8068924712", { linkPreview: true })
        await client.sendMessage(msg.from, "Clique no botão 'Obter Video'")

        await client.sendMessage(msg.from, "👇🏼 --- Proximo passo --- 👇🏼\n\nPasso 5 -\nDepois de baixar o video, vá no seu Kwai e crie um novo video. Selecione o video na sua galeria e publique. Utilize hashtags:")
        await client.sendMessage(msg.from, "#musthave #musthaveitens #viral")

        await client.sendMessage(msg.from, "👇🏼 --- Proximo passo --- 👇🏼\n\nPasso 6 -\nRepita esse mesmo passo 3 vezes para 3 videos diferentes.")

        await client.sendMessage(msg.from, "👇🏼 --- Proximo passo --- 👇🏼\n\nPasso 7 -\nFaça isso por 3 dias. Publique 1 video de manhã, 1 a tarde e 1 a noite.")

        await client.sendMessage(msg.from, "👇🏼 --- Proximo passo --- 👇🏼\n\nPasso 8 -\nApós 3 dias, seu perfil será validado e vai ser liberado uma função 'Vendedor' pra você")
        await client.sendMessage(msg.from, fotoArray[5]);
        await client.sendMessage(msg.from, fotoArray[6]);

        await client.sendMessage(msg.from, "👇🏼 --- Proximo passo --- 👇🏼\n\nPasso 9 -\nEssas são suas duas minas de ouro.\n\n- Tarefas remuneradas são atividades que o proprio Kwai propõe pra você ir fazendo. Ex: live com alguma hashtag, video com alguma hashtag. Fique atento pois cada semana há diferentes tarefas.\n\n- Comércio do Criador você pode criar seu proprio negocio mesmo nao tendo produtos.")

        await client.sendMessage(msg.from, "👇🏼 --- Proximo passo --- 👇🏼\n\nPasso 10 -\nAqui você vai selecionar os produtos que voce quer 'vender'. Eles irao aparecer na sua loja.")
        await client.sendMessage(msg.from, fotoArray[7]);

        await client.sendMessage(msg.from, "👇🏼 --- Proximo passo --- 👇🏼\n\nPasso 11 -\nDepois de adicionar os produtos na sua loja, voce vai clicar em publicar video. Procurar esse produto no Youtube. Baixar o video. Você vai gravar um video usando o video que voce baixou como tela verde. Assim voce nao precisa ter o produto pra falar dele. Voce vai publicar esse video, e se ele for bem feito, ele vai atingir uma grande quantidade de pessoas e voce vai vender o produto sem ter ele em mãos. A cada venda, voce ganha uma comissao.")
        await client.sendMessage(msg.from, fotoArray[8]);

        await client.sendMessage(msg.from, "Esperamos que você tenha muito sucesso nessa jornada!")
        await client.sendMessage(msg.from, "Em caso de dúvida digite 'DUVIDA'")

    }

    if (msg.body.includes('!getaudios')) {
        const chat = await msg.getChat();
        
        const messages = await chat.fetchMessages();

        const processMessages = async (messages) => {
            
            for (const message of messages) {
                if (message.hasMedia && message.type === 'audio') {
                    console.log("Enviando mensagem - ")
                    const audio = await message.downloadMedia();
                    audioArray.push(audio);
                }
            }
            client.sendMessage('5519997723110@c.us', "Audios pegos com sucesso!");

        };
        
        processMessages(messages).catch((error) => {
            console.error('Erro ao processar mensagens:', error);
        });
    }

    if (msg.body.includes('!getimages')) {
        const chat = await msg.getChat();
        
        const messages = await chat.fetchMessages();

        const processMessages = async (messages) => {
            
            for (const message of messages) {
                if (message.hasMedia && message.type === 'image') {
                    console.log("Enviando mensagem - ")
                    const foto = await message.downloadMedia();
                    fotoArray.push(foto);
                }
            }

            client.sendMessage('5519997723110@c.us', "Imagens pegas com sucesso!");
        };
        
        processMessages(messages).catch((error) => {
            console.error('Erro ao processar mensagens:', error);
        });
    }

    function aguardar1Segundo() {
        return new Promise(resolve => {
            setTimeout(resolve, 6000);
        });
    }


    async function recomecar (){
            const chat = await msg.getChat();

            async function minhaFuncao() {
                chat.sendStateRecording();
                await aguardar1Segundo();
                await client.sendMessage(msg.from, audioArray[0], { sendAudioAsVoice: true });
                chat.clearState();

                chat.sendStateRecording();
                await aguardar1Segundo();
                await client.sendMessage(msg.from, audioArray[1], { sendAudioAsVoice: true });
                chat.clearState();

                chat.sendStateRecording();
                await aguardar1Segundo();
                await client.sendMessage(msg.from, audioArray[2], { sendAudioAsVoice: true });
                chat.clearState();

                chat.sendStateRecording();
                await aguardar1Segundo();
                await client.sendMessage(msg.from, audioArray[3], { sendAudioAsVoice: true });
                chat.clearState();

                chat.sendStateRecording();
                await aguardar1Segundo();
                await client.sendMessage(msg.from, audioArray[4], { sendAudioAsVoice: true });
                chat.clearState();

                chat.sendStateRecording();
                await aguardar1Segundo();
                await client.sendMessage(msg.from, audioArray[5], { sendAudioAsVoice: true });
                chat.clearState();


                await aguardar1Segundo();
                await client.sendMessage(msg.from, fotoArray[0]);
                await client.sendMessage(msg.from, fotoArray[1]);
                await client.sendMessage(msg.from, fotoArray[2]);
                await client.sendMessage(msg.from, fotoArray[3]);
                await client.sendMessage(msg.from, fotoArray[4]);


                chat.sendStateRecording();
                await aguardar1Segundo();
                await client.sendMessage(msg.from, audioArray[6], { sendAudioAsVoice: true });
                chat.clearState();

                await client.sendMessage(msg.from, "Esse aqui (*R$19,97*) é um valor simbolico para o método que eu vou te ensinar.\nNão posso te entregar isso de graça, se não ninguém da valor ao conteúdo!\n\n\n\nPS: Não se esqueça que isso não é um curso e não tem reembolso, já que é algo que pode ser feito agora. Será tudo liberado pra você no ato de compra! É igual assinatura de TV, se você se cadastra, já consegue assistir e não tem como pedir reembolso de algo que você já está fazendo uso! Ao continuar você concorda com nossos termos de não reembolso.")

                chat.sendStateRecording();
                await aguardar1Segundo();
                await client.sendMessage(msg.from, audioArray[7], { sendAudioAsVoice: true });
                chat.clearState();

                await client.sendMessage(msg.from, "Deseja prosseguir? (SIM) / (NAO)")

                prosseguir = true;
            }

            minhaFuncao();
        } 
    


    if (msg.body.includes('Me conta mais sobre isso!')) {
        recomecar();
    }

    if (msg.body.toLowerCase() === "sim" && prosseguir == true){
        const chat = await msg.getChat();

        async function minhaFuncao(){
            chat.sendStateRecording();
            await aguardar1Segundo();
            await client.sendMessage(msg.from, audioArray[8], { sendAudioAsVoice: true });
            chat.clearState();


            client.sendMessage(msg.from, "Pronto para mudar de vida?\n(1)SIM, VAMOS LÁ!\n\n(2)NÃO! AINDA NÃO ESTOU PRONTO");
            vamosla = true
        }

        minhaFuncao()
    }


    if (msg.body.startsWith('1') && vamosla == true) {
        // Aqui você inicia a comunicação com o servidor Python
        const ws = new WebSocket('ws://localhost:8780');

        ws.on('open', () => {
            console.log('Conexão estabelecida com o servidor Python.');
        });

        ws.on('message', (data) => {
            mensagem = String(data)
            const [id, qrcode] = mensagem.split(',');
            console.log('ID:', id);
            console.log('QR Code:', qrcode);
            // Você pode enviar o ID e o QR Code de volta ao WhatsApp aqui
            client.sendMessage(msg.from, `ID: ${id}`);
            client.sendMessage(msg.from, "👇🏼 PIX COPIA E COLA 👇🏼");
            client.sendMessage(msg.from, qrcode);
            pixgerado = true
            client.sendMessage(msg.from, "Assim que você efetuar o pagamento, volte e mande e mensagem *PAGO* que nós iremos verificar se o pagamento foi feito certinho!");

            ws.on('close', (code, reason) => {
                console.log(`Conexão fechada, código: ${code}, motivo: ${reason}`);
            });
            ws.close();

        });

    }

    if (msg.body.toLowerCase() == "pago" && pixgerado == true) {
        let number = null;

        client.searchMessages("ID", {
            chatId: msg.from
        })
            .then(messages => {
                if (messages.length > 0) {
                    const message = messages[0];
                    const lastCharPosition = message.body.length - 1;

                    // Encontre a posição do primeiro número após um espaço
                    const firstNumberPosition = message.body.indexOf(' ');

                    // Se a posição do primeiro número for menor que a posição do último caractere, pegue o número

                    if (firstNumberPosition !== -1 && firstNumberPosition < lastCharPosition) {
                        const numberStr = message.body.substring(firstNumberPosition + 1, lastCharPosition + 1);
                        number = parseInt(numberStr, 10); // Converte a parte numérica para inteiro
                    }
                    console.log('Mensagem encontrada:', message.body);
                    console.log(number);
                    console.log(typeof(number))

                    const socket = new WebSocket('ws://localhost:8765');

                    socket.onopen = () => {
                        console.log('WebSocket connection opened.');
                        socket.send(number);
                    };

                    socket.onmessage = async (e) => {
                        console.log(e.data);

                        let volta = String(e.data);
                        [status, status_time] = volta.split(',');

                        if (status == "pending"){
                            await client.sendMessage(msg.from, audioArray[11], { sendAudioAsVoice: true });
                            //client.sendMessage(msg.from, "Seu pagamento ainda não caiu pra gente! 🥺")
                            await client.sendMessage(msg.from, "Aguarde 2 minutos e depois mande novamente a palavra 'PAGO' para confirmarmos o status")
                        }

                        if (status == "approved"){
                            await client.sendMessage('5519997723110@c.us', `Cliente do numero ${msg.from.replace(/\D/g, '')} efetuou o pagamento!`);
                            await client.sendMessage(msg.from, "Parabéns pela compra!")
                            await client.sendMessage(msg.from, audioArray[12], { sendAudioAsVoice: true });
                            await client.sendMessage(msg.from, "Irei te enviar agora o 'caminho das pedras' com tudo que você precisa saber e fazer pra ganhar uma graninha extra!")
                            await liberado();
                        }
                    };
                }
            })
            .catch(error => {
                console.error('Erro ao buscar mensagem:', error);
                client.sendMessage('5519997723110@c.us', `Cliente do numero ${msg.from.replace(/\D/g, '')} teve erro consultando o status do pagamento!\nO erro foi esse: ${error}`);
            });


    }

    if((msg.body.toLowerCase() === "nao" || msg.body.toLowerCase() === "2") && (vamosla == true || prosseguir == true)){
        const chat = await msg.getChat();

        async function minhaFuncao(){
            chat.sendStateRecording();
            await aguardar1Segundo();
            await client.sendMessage(msg.from, audioArray[9], { sendAudioAsVoice: true });
            chat.clearState();
    
            chat.sendStateRecording();
            await aguardar1Segundo();
            await client.sendMessage(msg.from, audioArray[10], { sendAudioAsVoice: true });
            chat.clearState();

            client.sendMessage(msg.from, "Bate-papo finalizado!")
            client.sendMessage(msg.from, "Para recomeçar digite 'RECOMECAR'")
            client.sendMessage(msg.from, "Em caso de dúvida digite 'DUVIDA'")

        }

        minhaFuncao()
    }

    if(msg.body.toLowerCase() === "recomecar")
    {
        naopassou = false;
        msg.body = "Me conta mais sobre isso!"
        recomecar();
        vamosla = false
        pixgerado = false
        prosseguir = false
    }

    if(msg.body.toLowerCase() === "duvida"){
        await client.sendMessage('5519997723110@c.us', `Cliente do numero ${msg.from.replace(/\D/g, '')} está com dúvida!`);
    }

});