const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flowSecundario = addKeyword(['menu', 'menu']).addAnswer(['¿Te puedo ayudar con algo más?',{capture:true}])

const flowVentas = addKeyword(['1']).addAnswer(
    ['👨🏽 Francisco se pondrá en contacto contigo en breve.', '\n*Menu* Para volver al mená principal.'],
    null,
    null,
    [flowSecundario]
)

const flowCatalogo = addKeyword(['2']).addAnswer(
    ['Mira nuestro catálogo de productos',{media: 'https://drive.google.com/file/d/1HED2Xccp5Vk2IAyiHCdNtlVsyP928xDO/view?usp=sharing'}, '\n*Menu* Para volver al mená principal.'],
    null,
    null,
    [flowSecundario]
)
const flowInmobiliario = addKeyword(['3']).addAnswer(
    ['Visita ', {media: 'https://drive.google.com/file/d/1HED2Xccp5Vk2IAyiHCdNtlVsyP928xDO/view?usp=sharing'}, '\n*Menu* Para volver al mená principal.'],
    null,
    null,
    [flowSecundario]
)
const flowWeb = addKeyword(['4']).addAnswer(
    ['Visita ', 'https://tienda.comercialmichelena.com', '\n*Menu* Para volver al mená principal.'],
    null,
    null,
    [flowSecundario]
)


const flowPrincipal = addKeyword(['hola', 'ole', 'alo'])
    .addAnswer('🙌 Hola te has comunicado con Comercial Michelena 👷🏽, tu mejor opción en materiales de construcción 🔨🪛')
    .addAnswer(
        [
            'Comercial Michelena tiene las mejores opciones para el constructor',
            'Escribe la opcion que te interesa',
            '👉 *1.* Para comunicarte con un asesor de ventas 🧱',
            '👉 *2.* Para solictar nuestro catálogo de Productos Ferreteros y de Construcción 🏗',
            '👉 *3.* Para ver nuestros proyectos Inmobiliarios 🏠 ',
            '👉 *4.* Para visitar nuestra tienda en línea 🧑🏽‍💻',
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
