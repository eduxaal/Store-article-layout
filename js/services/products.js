export async function getProduct(id) {
    var response = {
        status: 0,
        product: {
            sku: '1001',
            model: 'Solid color hoodie with drawstring',
            brand: {
                id: 'Hoodie',
                name: 'Solid color hoodie with drawstring'
            },
            price: 24.99,
            rating: 4,
            styles: [{
                    sku: '1001LG',
                    description: "Light Grey",
                    photo: 'photos/img1.png'
                },
                {
                    sku: '1001BK',
                    description: "Black",
                    photo: 'http://localhost:8088/Act2/photos/img2.png'
                },
                {
                    sku: '1001BL',
                    description: "Blue",
                    photo: 'http://localhost:8088/Act2/photos/img3.png'
                },
                {
                    sku: '1001GR',
                    description: "Green",
                    photo: 'http://localhost:8088/Act2/photos/img4.png'
                },
                {
                    sku: '1001BE',
                    description: "Beige",
                    photo: 'http://localhost:8088/Act2/photos/img5.png'
                },
            ],
            sizes: [{
                    sku: '1001S',
                    description: 'small',
                    size: 'S'
                }, 
                {
                    sku: '1001M',
                    description: 'medium',
                    size:'M'
                },
                {
                    sku: '1001L',                        
                    description: 'large',
                    size: 'L'
                }, 
                {
                    sku: '1001XL',
                    description: 'x-large',
                    size: 'XL'
                }, 
                {
                    sku: '10012XL',
                    description: '2x-large',
                    size: '2XL'
                },
            ]
        }
    };
    return response;
}