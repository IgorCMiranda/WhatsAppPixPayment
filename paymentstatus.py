import mercadopago
import asyncio
import websockets

sdk = mercadopago.SDK("APP_USR-5251433352527318-081622-7fd20b839490eb484a91a56d3412ab32-462944541")

async def server():
    # Set the stop condition when receiving SIGTERM.
    loop = asyncio.get_running_loop()
    stop = loop.create_future()
    loop.add_signal_handler(signal.SIGTERM, stop.set_result, None)

    async with websockets.serve(echo, "localhost", 8765):
        await stop


async def echo(websocket, path):
    async for message in websocket:
        resposta = sdk.payment().get(message)

        status = resposta['response']['status']
        outputmessage = str(status)
        outputmessage += ","
        status_detail = resposta['response']['status_detail']
        outputmessage += str(status_detail)

        await websocket.send(outputmessage)

        #asyncio.run(server())


start_server = websockets.serve(echo, "localhost", 8765)
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()