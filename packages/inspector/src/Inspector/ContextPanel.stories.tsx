import {
  useEffect,
} from 'react'
import type { StoryFn, Meta } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import {
  InspectContextPanel,
  type ElementInfoGenerator,
  type ElementItemInfo,
} from '@react-dev-inspector/web-components'
import {
  Inspector,
} from './Inspector'


// https://storybook.js.org/docs/react/writing-stories/introduction#component-story-format
export default {
  title: 'ContextPanel',
} satisfies Meta


const onClickItem = action('ElementItem.onClickItem')
const onClickEditor = action('ElementItem.onClickEditor')
const onHoverItem = action('ElementItem.onHoverItem')


const demoItems: ElementItemInfo[] = [
  {
    title: `ComponentName`,
  },
  {
    title: `ComponentName`,
    subtitle: 'relative/short/path',
    tags: ['Memo'],
  },
  {
    title: `ComponentName`,
    subtitle: 'relative/short/path',
    tags: ['Memo', 'Forward'],
  },
  {
    title: `ComponentName`,
    subtitle: 'relative/short/path',
    tags: ['Memo', 'Forward', 'Lazy', 'Lazzzzzzzzzzzzzzzzzzy'],
  },
  {
    title: `div`,
  },
  {
    title: `div`,
    subtitle: 'loooooooong/relative/path/to/packages/component.tsx',
    tags: ['Memo'],
  },
  {
    title: `LoooooooooooooooongComponentName`,
    subtitle: 'loooooooong/relative/path/to/packages/component.tsx',
    tags: ['Memo'],
  },
  {
    title: `LoooooooooooooooooooooooooooooooooongComponentName`,
    subtitle: 'loooooooong/relative/path/to/packages/component.tsx',
    tags: ['Memo', 'Forward', 'Lazy', 'Lazzzzzzzzzzzzzzzzzzy'],
  },
  {
    title: `div in <Card>`,
    subtitle: 'relative/path/to/packages/component.tsx',
    tags: ['Memo'],
  },
]


export const InspectContextPanelPure: StoryFn<{
  layerCount: number;
}> = ({ layerCount }) => {
  useEffect(() => {
    function *generator(): ElementInfoGenerator {
      for (let i = 0; i < 100; i++) {
        yield demoItems[i % demoItems.length]
      }
    }

    const renderLayers = () => {
      return Array.from({ length: layerCount }, () => generator)
    }

    const panel = new InspectContextPanel()

    panel.show({
      initialPosition: {
        x: 100,
        y: 100,
      },
      panelParams: {
        renderLayers: renderLayers(),
        sourceLayers: [],
        onHoverItem,
        onClickItem,
        onClickEditor,
      },
    })

    return () => {
      panel.remove()
    }
  })

  return (<Inspector />)
}

InspectContextPanelPure.args = {
  layerCount: 20,
}
