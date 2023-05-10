const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flowSecundario = addKeyword(['menu', 'menu']).addAnswer(['📄 Aquí tenemos el flujo secundario'])

const flowVentas = addKeyword(['info', 'informacion', 'información']).addAnswer(
    ['🤪 Únete al discord', 'https://link.codigoencasa.com/DISCORD', '\n*2* Para siguiente paso.'],
    null,
    null,
    [flowSecundario]
)

const flowWeb = addKeyword(['2']).addAnswer(
    ['Visita ', 'https://comercialmichelena.com', '\n*Menu* Para volver al mená principal.'],
    null,
    null,
    [flowSecundario]
)

const flowCatalogo = addKeyword(['newsletter', 'news']).addAnswer(
    'Indica cual es tu email', null, (ctx, { fallBack }) => {
        if (!ctx.body.includes('@')) return fallBack()}
)

const flowInmobiliario = addKeyword(['newsletter', 'news']).addAnswer(
    'Indica cual es tu email', null, (ctx, { fallBack }) => {
        if (!ctx.body.includes('@')) return fallBack()}
)

const flowPrincipal = addKeyword(['hola', 'ole', 'alo'])
    .addAnswer('🙌 Hola te has comunicado con Comercial Michelena 👷🏽, tu mejor opción en materiales de construcción 🔨🪛')
    .addAnswer(
        [
            '¿Como te encuentras?',
            'Escribe la opcion que te interesa',
            '👉 *1. *Para comunicarte con ventas 🧱',
            '👉 *2. *Para solictar nuestro catálogo de productos 🏗',
            '👉 *3. *Para ver nuestros proyectos Inmobiliarios 🏠 ',
            '👉 *4. *Para visitar nuestro sitio web 🧑🏽‍💻',
        ],
        null,
        null,
        [flowVentas, flowCatalogo, flowInmobiliario, flowWeb]
    )



const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
