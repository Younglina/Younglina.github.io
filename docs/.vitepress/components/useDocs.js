import docData from './docs.json'


export function useDocs() {
  docData.sort((a, b) => new Date(b.date) - new Date(a.date))

  const categories = {}
  const tags = new Set()
  let docNum = 0, tagNum = 0
  docData.map(item => {
    docNum++
    if (item.categories) {
      item.categories.map(c => {
        if (!categories[c]) {
          categories[c] = 0
        }
        categories[c]++
      })
    }
    if (item.tags) {
      item.tags.map(c => {
        tags.add(c)
      })
    }
  })
  tagNum = tags.size

  return {
    docData, categories, tags, docNum, tagNum
  }
}