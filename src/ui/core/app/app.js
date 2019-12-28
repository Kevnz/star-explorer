import React, { useEffect } from 'react'
import Phaser from 'phaser'
import { Router } from '@reach/router'
import { NavBar, NavBarBrand, Section } from '@brightleaf/elements'
import { Loading } from 'ui/components/loading'
import { AuthProvider } from 'ui/core/context/auth'
import { AppProvider } from 'ui/core/context/app'
import bgImg from 'ui/assets/bg.png'
import planetImg from 'ui/assets/planet-1.png'
import planetOtherImg from 'ui/assets/planet-5.png'
import rockPlanetImg from 'ui/assets/planet-3.png'
import bluishPlanetImg from 'ui/assets/planet-8.png'
import sunImg from 'ui/assets/sun-1.png'

import './app.scss'

const scale = 12

export default () => {
  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      parent: 'phaser-example',
      width: 1600,
      height: 800,
      scene: {
        preload: preload,
        create: create,
      },
    }

    const game = new Phaser.Game(config)

    function preload() {
      this.load.image('bg', bgImg)
      this.load.image('planet', planetImg)
      this.load.image('sun', sunImg)
      this.load.image('rocky', rockPlanetImg)
      this.load.image('other', planetOtherImg)
      this.load.image('blue', bluishPlanetImg)
    }

    function create() {
      const addPlanet = (x, y, height, width, name) => {
        const planet = this.add.image(x, y, name)
        planet.displayHeight = height
        planet.displayWidth = width
        return planet
      }
      this.spaceBG = this.add.tileSprite(0, 0, 800 * 4, 600 * 4, 'bg')

      const planet = addPlanet(600, 100, scale * 3, scale * 3, 'planet')

      const sun = this.add.image(800 - scale * 4, 400 - scale * 2, 'sun')
      sun.displayHeight = scale * 12
      sun.displayWidth = scale * 12
      addPlanet(300, 200, scale * 2, scale * 2, 'blue')
      addPlanet(500, 350, scale * 1, scale * 1, 'rocky')
      addPlanet(600, 650, scale * 2, scale * 2, 'other')
    }
  }, [])
  return (
    <AuthProvider>
      <AppProvider>
        <NavBar isPrimary isFixedTop className="is-radiusless">
          <NavBarBrand
            src="/favicon-32x32.png"
            href="/"
            target="navTarget"
            width="32"
            height="32"
          />
        </NavBar>
        <Section>
          <div id="phaser-example"></div>
        </Section>
      </AppProvider>
    </AuthProvider>
  )
}
