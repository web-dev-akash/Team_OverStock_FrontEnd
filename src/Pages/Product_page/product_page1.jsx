import {
  Badge,
  Box,
  Image,
  Icon,
  Container,
  Center,
  Button,
  Spinner,
  Heading,
  Skeleton,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { Grid, GridItem } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFurnitureData } from "../../redux/action";
import { Link } from "react-router-dom";

function AirbnbCard({ elements }) {
  const [isHovered, setIsHovered] = useState(false);
  const property = {
    imageUrl: elements.thumbnails[0][6],
    imageAlt: "Rear view of modern home with pool",
    badge: elements.badges,
    title: elements.title,
    formattedPrice: elements.price,
    reviewCount: elements.reviews,
    rating: elements.rating,
    delivery: elements.delivery.free,
    id: elements.position,
  };

  return (
    <Link to={`/product/${property.id}`}>
      <Box
        maxW="sm"
        borderWidth="1px"
        overflow="hidden"
        onMouseEnter={() => {
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
        }}
      >
        <Image src={property.imageUrl} alt={property.imageAlt} />

        <Box p="6" pl={1}>
          <Box
            fontWeight="bold"
            as="h1"
            lineHeight="tight"
            noOfLines={1}
            textAlign="left"
            color="red.600"
            fontSize="19px"
          >
            Sales Starts at USD {property.formattedPrice}
          </Box>

          <Box
            display="flex"
            mt="2"
            alignItems="center"
            style={{ display: isHovered ? "none" : "flex" }}
          >
            {Array(5)
              .fill("")
              .map((_, i) => (
                <StarIcon
                  key={i}
                  color={i < property.rating ? "yellow.500" : "gray.300"}
                />
              ))}
            <Box as="span" ml="2" color="gray.600" fontSize="sm">
              {property.reviewCount}
            </Box>
          </Box>
          <Box
            fontWeight="semibold"
            as="h3"
            lineHeight="tight"
            noOfLines={1}
            textAlign="left"
          >
            {property.title}
          </Box>
          {property.delivery && (
            <Box textAlign="left" mt={2}>
              <Badge colorScheme="green">Free Delivery</Badge>
            </Box>
          )}
        </Box>
      </Box>
    </Link>
  );
}
export const Products = () => {
  const state = useSelector((state) => state);
  const { loading, error, furnitures } = state;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFurnitureData());
  }, []);
  if (loading) {
    return (
        
        <Grid templateColumns='repeat(3, 1fr)' gap={6} ml={3}>
          <Skeleton width="360px" height="500px">
          </Skeleton>
          <Skeleton width="360px" height="500px">
          </Skeleton>
          <Skeleton width="360px" height="500px">
          </Skeleton>
        </Grid>
      // <Skeleton > 
      // </Skeleton>
    );
  }
  if (error) {
    return <Heading>Something Went Wrong.. Please Refresh</Heading>;
  }
  return (
    <Center key={Math.random()}>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {furnitures.map((elm) => (
          <AirbnbCard key={elm.position} elements={elm} />
        ))}
      </Grid>
    </Center>
  );
};
