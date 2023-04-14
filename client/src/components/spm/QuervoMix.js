// Search books is now HOME
import React from 'react';
import Carousel from 'react-bootstrap/Carousel';


// the actual search now goes off to searchgpt file.
const QuervoMix = () => {
  return (
    <>
     
     <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://a.cdn-hotels.com/gdcs/production0/d1513/35c1c89e-408c-4449-9abe-f109068f40c0.jpg?impolicy=fcrop&w=1600&h=1066&q=medium://www.foodandwine.com/thmb/k1NIRDevthtQki2w8glZ7_qCUsM=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/sous-vide-pork-chops-FT-RECIPE1221-3825e22b32ea4794a87d472e299b2a30.jpg"
          alt="First slide"
          height= "300"
          width="700"
        />
        <Carousel.Caption>
          <h3>You Hungry huh?</h3>
          <p>This aint Mcdonalds!</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://www.washingtonian.com/wp-content/uploads/2021/07/2Fiftys-994x663.jpg"
          alt="Second slide"
          height= "300"
          width="700"
        />

        <Carousel.Caption>
          <h3>How About some BBQ?</h3>
          <p>Twelve hours later..</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F19%2F2019%2F03%2F04%2Fpopeyeschicken-2000.jpg"
          alt="Third slide"
          height= "300"
          width="700"
        />

        <Carousel.Caption>
          <h3>Chicken?</h3>
          <p>
            Gotta make it spicy!
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </>
  );
};

export default QuervoMix;