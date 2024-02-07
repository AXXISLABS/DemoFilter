import { 
    bootstrapCameraKit,
    createMediaStreamSource,
    Transform2D,
} from '@snap/camera-kit'

(async function(){
    var cameraKit = await bootstrapCameraKit({ apiTocken: 'eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzA3MzM3NzQwLCJzdWIiOiI4Y2Q5MTAzOC04ODkyLTQxNjMtYjVmZi0yMjUxNjI3MjE4NmJ-U1RBR0lOR35hOTgxYTZjNS1jMDlhLTQ3MjQtYWFiZC0yN2IzMzEwYjU0ZmIifQ.IpgPqMWskRuhhOjtVv-9SsNpQGNQg5nwd8nXtvpQwh0' })

    const session = await cameraKit.createSession()
    document.getElementById('canvas').replaceWith(session.output.live)

    const { lenses } = await cameraKit.lensRepository.loadLensGroups(['202e1109-2823-4c7c-8cb1-3367d624420f'])

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