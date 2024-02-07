import { 
    bootstrapCameraKit,
    createMediaStreamSource,
    Transform2D,
} from '@snap/camera-kit'

(async function(){
    var cameraKit = await bootstrapCameraKit({ apiTocken: 'eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzA3MzM2NzIzLCJzdWIiOiI4Y2Q5MTAzOC04ODkyLTQxNjMtYjVmZi0yMjUxNjI3MjE4NmJ-U1RBR0lOR345MTBiZDRiMy03MzkzLTQwMGItYjhhMi0yNTE1N2Y1OWFkYzQifQ.9s8se4YetfETGlGUztCU3QUHxZX1DNELwVg2aTSaLss' })

    const session = await cameraKit.createSession()
    document.getElementById('canvas').replaceWith(session.output.live)

    const { lenses } = await cameraKit.lensRepository.loadLensGroups(['40983991-0e15-40d5-a409-65f840e8bd69'])

    session.applyLens(lenses[0])

    let mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });

    const source = createMediaStreamSource(mediaStream, {
        transform: Transform2D.MirrorX,
        cameraType: 'front'
    })

    await session.setSource(source)

    session.source.setRenderSize(window.innerWidth, window.innerHeight)

    session.play()
})();