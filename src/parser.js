const indefiniteArticle = (word) => {
  if (word.match(/^[aeiou]/i)) {
    return `an ${word}`
  } else {
    return `a ${word}`
  }
}

const capitalize = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1)
}

const parser = (content, entities) => {
  const parsedContent = content.replace(/%{[^}]+}/g, match => {
    const innerContent = match.replace(/%{|}/g, "").split("-")
    const [ base, ...modifiers ] = innerContent
    const matchedEntity = entities.find(entity => entity.name === base)

    if (!matchedEntity) {
      return "Error Content not found"
    }

    let modifiedValue = matchedEntity.value

    if (modifiers.includes('c')) {
      modifiedValue = capitalize(modifiedValue)
    }

    if (modifiers.includes('l')) {
      modifiedValue = modifiedValue.toLowerCase()
    }

    if (modifiers.includes('ia')) {
      modifiedValue = indefiniteArticle(modifiedValue)
    }

    return modifiedValue
  })

  return parsedContent
}

export default parser
