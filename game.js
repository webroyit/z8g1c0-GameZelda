// Initialize Kaboom.js
kaboom({
    global: true,
    fullscreen: true,
    scale: 1,
    debug: true,     // To get debug message on the screen,
    clearColor: [0, 0, 0, 1]    // Black Color
})

// Apply URL starting path to all loadSprite
loadRoot('https://i.imgur.com/')

loadSprite('link-going-left', '1Xq9biB.png')
loadSprite('link-going-right', 'yZIb8O2.png')
loadSprite('link-going-down', 'tVtlP6y.png')
loadSprite('link-going-up', 'UkV0we0.png')
loadSprite('left-wall', 'rfDoaa1.png')
loadSprite('top-wall', 'QA257Bj.png')
loadSprite('bottom-wall', 'vWJWmvb.png')
loadSprite('right-wall', 'SmHhgUn.png')
loadSprite('bottom-left-wall', 'awnTfNC.png')
loadSprite('bottom-right-wall', '84oyTFy.png')
loadSprite('top-left-wall', 'xlpUxIm.png')
loadSprite('top-right-wall', 'z0OmBd1.jpg')
loadSprite('top-door', 'U9nre4n.png')
loadSprite('fire-pot', 'I7xSp7w.png')
loadSprite('left-door', 'okdJNls.png')
loadSprite('lanterns', 'wiSiY09.png')
loadSprite('slicer', 'c6JFi5Z.png')
loadSprite('skeletor', 'Ei1VnX8.png')
loadSprite('kaboom', 'o9WizfI.png')
loadSprite('stairs', 'VghkL08.png')
loadSprite('bg', 'u4DVsx6.png')

// Layout of the game
scene("game", ({ level, score }) => {
    // Kaboom.js methods 
    // 'obj' for collide of the images with player 
    layers(['bg', 'obj', 'ui'], 'obj')

    const MOVE_SPEED = 120
    const SLICER_SPEED = 100

    // Create the map of the game with Kaboom.js
    const maps = [
        [
            'ycc)cc^ccw',
            'a        b',
            'a      * b',
            'a    (   b',
            '%        b',
            'a    (   b',
            'a   *    b',
            'a        b',
            'xdd)dd)ddz',
        ],
        [
            'yccccccccw',
            'a        b',
            ')        )',
            'a        b',
            'a        b',
            'a    $   b',
            ')   }    )',
            'a        b',
            'xddddddddz',
        ],
    ];

    const levelCfg = {
        width: 48,
        height: 48,
        // Set the value to represent an image
        a: [sprite('left-wall'), solid(), 'wall'],
        b: [sprite('right-wall'), solid(), 'wall'],
        c: [sprite('top-wall'), solid(), 'wall'],
        d: [sprite('bottom-wall'), solid(), 'wall'],
        w: [sprite('top-right-wall'), solid(), 'wall'],
        x: [sprite('bottom-left-wall'), solid(), 'wall'],
        y: [sprite('top-left-wall'), solid(), 'wall'],
        z: [sprite('bottom-right-wall'), solid(), 'wall'],
        '%': [sprite('left-door'), solid()],
        '^': [sprite('top-door'), 'next-level'],
        $: [sprite('stairs'), 'next-level'],
        '*': [sprite('slicer'), 'slicer', { dir: -1 }],
        '}': [sprite('skeletor')],
        ')': [sprite('lanterns'), solid()],
        '(': [sprite('fire-pot'), solid()],
    }

    addLevel(maps[level], levelCfg)

    // Apply the background image to the game
    add([sprite('bg'), layer('bg')])

    const scoreLabel = add([
        text('0'),
        pos(400, 450),
        layer('ui'),
        {
            value: score
        },
        scale(2)
    ])

    add([text('level ' + parseInt(level + 1)), pos(400, 480), scale(2)])

    // Add Link
    const player = add([
        sprite('link-going-right'),
        pos(5, 190),
        {
            // right by default
            dir: vec2(1, 0)
        }
    ])

    player.action(() => {
        player.resolve()
    })

    player.overlaps('next-level', () => {
        go('game', {
            level: (level + 1) % maps.length,
            score: scoreLabel.value
        })
    })

    // Change the direction of slicer when it hits the wall
    collides('slicer', 'wall', (s) => {
        s.dir = -s.dir
    })

    // Make slicer move
    action('slicer', (s) => {
        s.move(s.dir * SLICER_SPEED, 0)
    })

    keyDown('left', () => {
        player.changeSprite('link-going-left')
        player.move(-MOVE_SPEED, 0)
        player.dir = vec2(-1, 0)
    })

    keyDown('right', () => {
        player.changeSprite('link-going-right')
        player.move(MOVE_SPEED, 0)
        player.dir = vec2(1, 0)
    })

    keyDown('up', () => {
        player.changeSprite('link-going-up')
        player.move(0, -MOVE_SPEED)
        player.dir = vec2(0, -1)
    })

    keyDown('down', () => {
        player.changeSprite('link-going-down')
        player.move(0, MOVE_SPEED)
        player.dir = vec2(0, 1)
    })
})

// Start the scene
start("game", { level: 0, score: 0 })