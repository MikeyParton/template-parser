import React, { Component } from 'react';
import styled from 'styled-components'
import parser from './parser'
import {
  Page,
  Title,
  Row,
  Column,
  TemplateInput,
  TemplatePreview,
  EntityForms,
  EntityForm,
  Help
} from './styled'

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
    const preview = parser(content, entities)

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
