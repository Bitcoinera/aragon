import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Field,
  GU,
  Link,
  Modal,
  textStyle,
  useViewport,
  useTheme,
} from '@aragon/ui'
import { simpleUrl } from '../../url-utils'
import AppIcon from '../../components/AppIcon/AppIcon'

function TemplateDetails({ template, visible, onUse, onClose }) {
  const theme = useTheme()
  const { above, below, width } = useViewport()

  const handleUseClick = useCallback(() => {
    onUse(template.id)
  }, [onUse, template])

  const modalWidth = useCallback(() => {
    if (above('large')) {
      return 130 * GU
    }
    if (above('medium')) {
      return 80 * GU
    }
    return width - 4 * GU
  }, [above, width])

  if (template === null) {
    return null
  }

  let padding = 2 * GU
  if (above('medium')) padding = 5 * GU
  if (above('large')) padding = 7 * GU

  const verticalMode = below('large')

  return (
    <Modal visible={visible} width={modalWidth} onClose={onClose} padding={0}>
      <section
        css={`
          ${verticalMode
            ? ''
            : `
              display: grid;
              grid-template-columns: auto ${48 * GU}px;
            `};
        `}
      >
        <div
          css={`
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: ${padding}px;
          `}
        >
          <div>
            <div css="display: flex">
              <AppIcon src={template.icon} size={6.5 * GU} />
            </div>
            <h1
              css={`
                // Not in aragonUI - exceptionally used here
                font-size: 40px;
                font-weight: 600;
                padding: ${3 * GU}px 0 ${2 * GU}px;
              `}
            >
              {template.name}
            </h1>
            <p
              css={`
                ${textStyle('body1')};
                color: ${theme.contentSecondary};
              `}
            >
              {template.longdesc}
            </p>
            <div
              css={`
                margin: ${5 * GU}px 0 0;
              `}
            >
              <Field label="Case study" css="margin-bottom: 0">
                <Link href={template.caseStudyUrl}>
                  {simpleUrl(template.caseStudyUrl)}
                </Link>
              </Field>
            </div>
          </div>

          {!verticalMode && (
            <Button mode="strong" onClick={handleUseClick} wide>
              Use this template
            </Button>
          )}
        </div>
        <div
          css={`
            height: 100%;
            width: ${verticalMode ? 'auto' : `${48 * GU}px`};
            padding: ${verticalMode
              ? `${padding}px`
              : `${7 * GU}px ${3 * GU}px`};
            background: ${theme.background};
          `}
        >
          <h2
            css={`
              padding-bottom: ${3 * GU}px;
              ${textStyle('body1')};
            `}
          >
            Template configuration
          </h2>

          <Field
            label="Required modules"
            css={`
              height: 150px;
            `}
          />
          <Field
            label="Optional modules"
            css={`
              height: 150px;
            `}
          />
          <Field label="Source code">
            <Link href={template.sourceCodeUrl}>
              {simpleUrl(template.sourceCodeUrl)}
            </Link>
          </Field>
          <Field label="Registry">{template.registry}</Field>
          {verticalMode && (
            <Button mode="strong" onClick={onUse} wide>
              Use this template
            </Button>
          )}
        </div>
      </section>
    </Modal>
  )
}

TemplateDetails.propTypes = {
  onClose: PropTypes.func.isRequired,
  onUse: PropTypes.func.isRequired,
  template: PropTypes.object.isRequired,
  visible: PropTypes.bool.isRequired,
}

export default TemplateDetails
