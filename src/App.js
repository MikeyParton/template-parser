import React, { Component } from 'react';
import styled from 'styled-components'

const ia = (word) => {
  if (word.match(/^[aeiou]/i)) {
    return `an ${word}`
  } else {
    return `a ${word}`
  }
}

const c = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1)
}

const parseContent = (content, entities) => {
  const parsedContent = content.replace(/%{[^}]+}/g, match => {
    const innerContent = match.replace(/%{|}/g, "").split("-")
    const [ base, ...modifiers ] = innerContent
    const matchedEntity = entities.find(entity => entity.name === base)

    if (!matchedEntity) {
      return "Error Content not found"
    }

    let modifiedValue = matchedEntity.value

    if (modifiers.includes('c')) {
      modifiedValue = c(modifiedValue)
    }

    if (modifiers.includes('l')) {
      modifiedValue = modifiedValue.toLowerCase()
    }

    if (modifiers.includes('ia')) {
      modifiedValue = ia(modifiedValue)
    }

    return modifiedValue
  })

  return parsedContent
}

const Page = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
`

const Title = styled.h1`
  text-align: center;
`

const Row = styled.div`
  display: flex;
  flex-grow: 1;
  padding: 20px
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin-right: 20px
`

const TemplateInput = styled.textarea`
  font-size: 16px;
  flex-grow: 1
  padding: 20px;
`

const TemplatePreview = styled.div`
  width: 50%;
`

const EntityForms = styled.div`
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
`

const EntityForm = styled.div`
  display: flex;
  padding-right: 10px;
  padding-bottom: 10px;
  border-right: 1px solid black;

  label {
    margin-right: 10px;
    margin-left: 10px;
  }
`

const Help = styled.div`
  background-color: #f6f8fa
  padding: 10px;

  ul {
    font-family: monospace;
  }
`

class App extends Component {
  state = {
    content: "",
    entities: [
      { name: "user_name", value: "Rachel Green" },
      { name: "name", value: "Accountant" }
      , {}, {}, {}, {}, {}, {}, {}, {}]
  }

  onChangeContent = (event) => {
    const newContent = event.target.value
    this.setState({ content: newContent })
  }

  onChangeEntity = (event, index) => {
    const value = event.target.value
    const name = event.target.name

    const newEntity = {
      ...this.state.entities[index],
      [name]: value
    }

    this.setState({
      entities: [
        ...this.state.entities.slice(0, index),
        newEntity,
        ...this.state.entities.slice(index + 1)
      ]
    })
  }

  addEntity = () => {
    this.setState({ ...this.state, entities: [...this.state.entities, {}] })
  }

  render() {
    const { content, entities } = this.state
    const preview = parseContent(content, entities)

    return (
      <Page>
        <Title>Auto Description Template Parser</Title>
        <Row>
          <Column>
            <TemplateInput placeholder="Enter a template string and see the preview on the right." value={content} onChange={this.onChangeContent} />
            <Help>
              <h4>Modifiers</h4>
              <p>The following modifiers can be applied to the template values. Make sure to put them after the main value and seperate them with dashes e.g. {'%{name-ia-l}'}</p>
              <ul>
                <li>c   (Capitalise) - changes the first letter of the word to a capital letter</li>
                <li>l   (Lowercase) - changes all of the letters of the word to lowercase</li>
                <li>ia  (Indefinite Article) - correctly adds "a" or "an to the word"</li>
              </ul>
            </Help>
            <EntityForms>
              {entities.map((entity, index) => (
                <EntityForm key={index}>
                  <label>Key</label>
                  <input name="name" value={entity.name} onChange={(event) => this.onChangeEntity(event, index)} />
                  <label>Value</label>
                  <input name="value" value={entity.value} onChange={(event) => this.onChangeEntity(event, index)} />
                </EntityForm>
              ))}
              <button onClick={this.addEntity}>Add Content</button>
            </EntityForms>
          </Column>
          <TemplatePreview>
            <h3>Preview</h3>
            {preview}
          </TemplatePreview>
        </Row>
      </Page>
    )
  }
}

export default App;
