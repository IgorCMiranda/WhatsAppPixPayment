import mercadopago
import asyncio
import websockets
import tracemalloc
import signal


tracemalloc.start()
# Configurar o SDK do Mercado Pago
sdk = mercadopago.SDK("APP_USR-5251433352527318-081622-7fd20b839490eb484a91a56d3412ab32-462944541")


async def server():
    # Set the stop condition when receiving SIGTERM.
    loop = asyncio.get_running_loop()
    stop = loop.create_future()
    loop.add_signal_handler(signal.SIGTERM, stop.set_result, None)

    async with websockets.serve(echo, "localhost", 8765):
        await stop


async def prin (websocket):
    id_value = 0

    payment_data = {
        "transaction_amount": 19.97,
        "description": "MetodoIsabela",
        "payment_method_id": "pix",
        "notification_url": f"https://wa.me//5519997723110?text=Pagamento%20realizado%20numero%20{id_value}",
        "payer": {
            "email": "isamachadooficial@gmail.com",
            "first_name": "Isabela",
            "last_name": "Machado",
            "identification": {
                "type": "47011784896",
                "number": "19997123110"
            }
        }
    }

    payment_response = sdk.payment().create(payment_data)

    payment = payment_response["response"]

    # Acessando o valor do campo "id"
    id_value = payment['id']
    output_message = str(payment['id'])
    qr_code_value = payment['point_of_interaction']['transaction_data']['qr_code']
    output_message += ","
    output_message += str(qr_code_value)
    await websocket.send(output_message)

    asyncio.run(server())

    print(output_message)
    print(id_value)
    print(qr_code_value)



async def echo(websocket, path):
    while True:
        await prin(websocket)

start_server = websockets.serve(echo, "localhost", 8780)
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
