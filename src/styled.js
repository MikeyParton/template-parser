import styled from 'styled-components'

export const Page = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
`

export const Title = styled.h1`
  text-align: center;
`

export const Row = styled.div`
  display: flex;
  flex-grow: 1;
  padding: 20px
`

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin-right: 20px
`

export const TemplateInput = styled.textarea`
  font-size: 16px;
  flex-grow: 1
  padding: 20px;
`

export const TemplatePreview = styled.div`
  width: 50%;
`

export const EntityForms = styled.div`
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
`

export const EntityForm = styled.div`
  display: flex;
  padding-right: 10px;
  padding-bottom: 10px;
  border-right: 1px solid black;

  label {
    margin-right: 10px;
    margin-left: 10px;
  }
`

export const Help = styled.div`
  background-color: #f6f8fa
  padding: 10px;

  ul {
    font-family: monospace;
  }
`
