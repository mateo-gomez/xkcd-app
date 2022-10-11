import { Col, Container, Row, Text } from "@nextui-org/react";
import { Box } from "components/Box";
import { Layout } from "components/Layout";
import { useI18N } from "context/i18n";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { search } from "services/search";

export default function Search({ results = [] }) {
  const router = useRouter();
  const { trans } = useI18N();
  const { q } = router.query;

  return (
    <Layout>
      <Container sm>
        {Boolean(q) && (
          <h3>
            {trans(
              "SEARCH_RESULTS_TITLE",
              { count: results.length },
              results.length,
              q
            )}
          </h3>
        )}
        <Row>
          <Col as={"ul"}>
            {Boolean(results) &&
              results.map((comic) => (
                <Row
                  as={"li"}
                  css={{
                    bgColor: "$primaryLight",
                    "&:hover": { bgColor: "$primaryLightActive" },
                    mx: "$5",
                    flex: 1,
                    p: "$5",
                    mb: "$0",
                  }}
                  key={comic.id}
                >
                  <Link href={`/comic/${comic.id}`}>
                    <Box as={"a"} css={{ display: "flex", flex: 1 }}>
                      <Image
                        src={comic.img}
                        width={50}
                        height={50}
                        alt={comic.alt}
                      />
                      <Text>{comic.title}</Text>
                    </Box>
                  </Link>
                </Row>
              ))}
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  const { q } = query;

  const { results } = await search({ q });

  return {
    props: { results },
  };
}
