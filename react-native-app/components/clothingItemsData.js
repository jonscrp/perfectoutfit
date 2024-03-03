

const sampleCardsData=[
    {
      id: 0,
      name: 'macys black pants 013412',
      displayText: `H&M 
      Men's Baggy Jeans Black`,
      images: {
          front: 'https://lp2.hm.com/hmgoepprod?set=format%5Bwebp%5D%2Cquality%5B79%5D%2Csource%5B%2Fa9%2Fc9%2Fa9c948b779d1d73c401e3dc5325a9ddf8bc82f0a.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url%5Bfile%3A%2Fproduct%2Fmain%5D',
          // back: ''
      },
      // description: {
      //   Length: "Long",
      //   WaistRise: "Regular waist",
      //   Fit: "Loose fit",
      //   Style: "Balloon Leg, Stacked",
      //   Description: "Dark denim gray, Solid-color",
      //   Imported: "Yes",
      //   Concept: "DENIM"
      // }
    }
  ]
  for (let i=1 ; i <= 10; i++) {
    sampleCardsData.push({...sampleCardsData[0]})
    sampleCardsData[i].id=i
  }

export const clothingItemsData = [
  ...sampleCardsData
]