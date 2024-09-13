/// <reference path="dwarfs.d.ts" />

$click('btn-adventure', () => {
    if (dwarfsWaiting.length){
        jaxpi.clicked().dialog("Send on Adventure")
        dwarfsWaiting[0].purpose = DwarfsPurpose.TREASURE
    }

    if (started) return
    // if (isMobile) {
    //     const d = document.documentElement as any
    //     const fun = d.requestFullscreen as Function ||
    //         d.mozRequestFullScreen as Function ||
    //         d.webkitRequestFullScreen as Function
    //     if (typeof fun == 'function') fun.call(d)
    // }

    try {
        audioInit().then(playLoop)
    }
    catch (err) {
    }

    started = true
})

$click('btn-draft', () => {
    jaxpi.clicked().dialog("Draft Another Dwarf")
    updateGold(-draftCost)
    updateDraftCost()
    dwarfs.push(new Dwarf)
    $setContent('dwarf-count', dwarfs.length)
    $('dwarf-plural').style.display = dwarfs.length == 1 ? 'none' : 'inline'
})

$click('btn-covfefe', () => {
    jaxpi.clicked().dialog("Hot Coffee")
    updateGold(-10)
    dwarfSpeed *= 1.2
    $despawn('covfefe')
    $spawn('fasta')
})

$click('btn-fasta', () => {
    jaxpi.clicked().dialog("Red Goes Fasta!")
    updateGold(-25)
    dwarfSpeed *= 1.1
    $despawn('fasta')
})

$click('btn-autorun', () => {
    jaxpi.clicked().dialog("Automated Adventuring")
    updateGold(-20)
    hasAutorun = true
    $despawn('autorun')
    $spawn('turborun')
})

$click('btn-turborun', () => {
    jaxpi.clicked().dialog("Turbo Button")
    updateGold(-30)
    autorunSpeed *= 0.5
    $despawn('turborun')
    $spawn('speedrun')
})

$click('btn-speedrun', () => {
    jaxpi.clicked().dialog("Intel Core i9")
    updateGold(-40)
    autorunSpeed *= 0.5
    $despawn('speedrun')
})

$click('btn-illuminate', () => {
    jaxpi.clicked().dialog("Illuminate The Forest")
    updateGold(-25)
    forest.palette = PAL_FOREST
    forest.buf = bufForestLit
    speedForest *= 1.3
    $despawn('illuminate')

    setTimeout(() => {
        jaxpi.achieved().achievement("Dwarf's Kegs")
        paused = true
        forest.buf = bufForestKegs
        dwarfsFoundAle()
        $spawnModal('kegs')
    }, 10000)
})

$click('btn-continue', () => {
    $despawnModal('kegs', () => {
        paused = false
        $spawn('orbital')
    })
})

$click('btn-orbital', () => {
    jaxpi.clicked().dialog("Make Dwarfs Work Again")
    jaxpi.achieved().achievement("Nuke the Dwarfs")
    paused = true
    $spawnModal('nuke')
})

$click('btn-continue2', () => {
    $despawnModal('nuke', () => {
        $despawn('orbital')

        orbital(() => {
            dwarfsNoAle()
            forest.palette = PAL_WASTELAND
            forest.buf = bufWasteland
            paused = false

            goldSpawn.push([10, 'develop'])
            updateGold(0)
        })
    })
})

$click('btn-develop', () => {
    jaxpi.clicked().dialog("Develop The Wasteland")
    updateGold(-20)
    forest.buf = bufWastelandRoad
    speedForest *= 1.3
    $despawn('develop')
    $spawn('develop2')
})

$click('btn-develop2', () => {
    jaxpi.clicked().dialog("Industrial Revolution")
    updateGold(-25)
    forest.buf = bufWastelandAperture
    dwarfCapacity = 2
    $despawn('develop2')
    $spawn('genetic')

    goldSpawn.push([30, 'portal'])
    goldSpawn.push([60, 'delorean'])
    updateGold(0)
})

$click('btn-genetic', () => {
    jaxpi.clicked().dialog("Genetic Modification")
    updateGold(-30)
    dwarfCapacity = 3
    $despawn('genetic')
})

$click('btn-portal', () => {
    jaxpi.clicked().dialog("Thinking With Portals")
    updateGold(-60)

    renderPortal(bufFortress.getContext('2d')!, 432 - Inline.B_SCALE * 6,
        Inline.groundLevel - Inline.B_SCALE, PAL_PORTAL_BLUE)
    renderPortal(bufFortressExit.getContext('2d')!, 432 - Inline.B_SCALE * 6,
        Inline.groundLevel - Inline.B_SCALE, PAL_PORTAL_BLUE)
    renderPortal(bufTreasure.getContext('2d')!, 32,
        Inline.groundLevel - Inline.B_SCALE, PAL_PORTAL_ORANGE)

    dwarfPortal = true
    $despawn('portal')
})

$click('btn-delorean', () => {
    jaxpi.clicked().dialog("Build a Time Machine")
    updateGold(-90)
    fortress.buf = bufFortressExit
    $despawn('delorean')
    $spawn('back')
})

$click('btn-back', () => {
    jaxpi.clicked().dialog("Go Back in Time")
    jaxpi.completed(totalGold).game("Dwarfs")
    $despawn('back')

    setTimeout(() => {
        $despawn('treasure')
        setTimeout(() => {
            $despawn('forest')
            setTimeout(() => {
                $despawn('fortress')
                setTimeout(() => {
                    $despawn('title')
                    setTimeout(() => {
                        location.reload()
                    }, 300)
                }, 300)
            }, 300)
        }, 300)
    }, 10)
})

for (let btn of ['btn-adventure', 'btn-draft', 'btn-covfefe', 'btn-fasta', 'btn-autorun',
    'btn-turborun', 'btn-speedrun', 'btn-illuminate', 'btn-continue', 'btn-orbital',
    'btn-continue2', 'btn-develop', 'btn-develop2', 'btn-genetic', 'btn-portal',
    'btn-delorean', 'btn-back']) {
    $(btn).oncontextmenu = function (event: MouseEvent) {
        event.preventDefault()
    }
}

const preventDoubleTapZoom = (delay: number) => {
    let beforeLastTouchStart = 0
    let lastTouchStart = 0

    document.addEventListener('touchstart', () => {
        beforeLastTouchStart = lastTouchStart
        lastTouchStart = Date.now()
    })

    document.addEventListener('touchend', (event: TouchEvent) => {
        const touchEnd = Date.now()
        if (touchEnd - beforeLastTouchStart < delay) {
            event.preventDefault()
        }
        const target = event.target as HTMLElement
        if (target && target.click) {
            target.click()
        }
    })
}

preventDoubleTapZoom(400)
