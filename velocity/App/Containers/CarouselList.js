var CarouselList = [
    {
    Category:'Food',    
    Items:[
        {
            displayText : 'Entertainment',
            descriptionText : '\nQueen + Adam Lambert Munich - Tickets'
                                +'\nDo, 02.11.17, 20:00 UhrOlympiahalle München'
                                +'Spiridon-Louis-Ring 21, 80809 MÜNCHEN',
            slideColor: 'green',
            categoryId:0,
            offerID:0,
            totalDays:7,
            totalDistance:120,
            discount:'20% OFF',
            colorArray:['yellow','green'],
            color1:'yellow',
            color2:'green',
            hexArray:['#ffff00','#2eb82e'],
            logo:require('../Images/theater.png')
        },
        {
            displayText : 'Smoothie',
            descriptionText : '\nGet a cold pressed Activator smoothie from Deav and David'
                                +'\n\nKarotte, Orange, Ananas, Ingwer, Acerola-Pulver. 95 cal',
            slideColor: 'green',
            categoryId:0,
            offerID:1,
            totalDays:7,
            totalDistance:10,
            discount:'50% OFF',
            colorArray:['yellow','green'],
            color1:'yellow',
            color2:'green',
            hexArray:['#ffff00','#2eb82e'],
            logo:require('../Images/smoothie.png')
        },
        {
            displayText : 'Superstar',
            descriptionText : '\nGet your new Adidas Superstar '
                                +'\n\nThis 70’s sneaker began life as a' 
                                +'court-dominating B-Ball shoe.' 
                                +'Full grain leather.',
            slideColor: 'green',
            categoryId:1,
            offerID:0,
            totalDays:7,
            totalDistance:100,
            discount:'20% OFF',
            colorArray:['orange','yellow'],
            color1:'orange',
            color2:'yellow',
            hexArray:['#ffff00','#2eb82e'],
            logo:require('../Images/adidasshoes.png')
        }
        
    ]},
    {
      Category:'Fashion',  
      Items: [ 
          {
            displayText : 'Cycling Gear',
            descriptionText : '\nTOMTOM SPARK 3 GPS FITNESS WATCH'
                                +'\n Run. Gym. Bike. Swim. Treadmill.'
                                 +'Freestyle. Track different activities on your fitness watch.',
            slideColor: 'orange',
            categoryId:1,
            offerID:2,
            totalDays:7,
            totalDistance:150,
            discount:'25% OFF',
            colorArray:['orange','yellow'],
            color1:'orange',
            color2:'yellow',
            hexArray:['#ff6600','#ffff00'],
            logo:require('../Images/helmet.png')
        },  
        {
            displayText : 'Salad',
            descriptionText : '\nGet a fresh made Sweet Summer salad from Dean and David.'
                                +'\nGrilled oyster mushrooms, mozarella, basilikum,'
                                +'tomatos, onions, apple-elder-dressing. ',
            slideColor: 'green',
            categoryId:0,
            offerID:2,
            totalDays:7,
            totalDistance:50,
            discount:'15% OFF',
            colorArray:['yellow','green'],
            color1:'yellow',
            color2:'green',
            hexArray:['#ff6600','#ffff00'],
            logo:require('../Images/salad.png')
        },
        {
            displayText : 'Perfume',
            descriptionText : '\nCycle for 100ml of the traditional Romance Eau de Parfum from Ralph Lauren.'
                                +'\nOpulent, Luxury, Feminine - "Sungoddess"' 
                                +'Rose. (100ml)',
            slideColor: 'orange',
            categoryId:1,
            offerID:1,
            totalDays:7,
            totalDistance:90,
            discount:'30% OFF',
            colorArray:['orange','yellow'],
            color1:'orange',
            color2:'yellow',
            hexArray:['#ff6600','#ffff00'],
            logo:require('../Images/perfume.png')
        },
          
    ]}
]

module.exports = CarouselList