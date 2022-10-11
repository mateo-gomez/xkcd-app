import Image from "next/image";
import { Layout } from "components/Layout";
import fs from "fs/promises";
import { Col, Container, Grid, Row, Text } from "@nextui-org/react";
import Link from "next/link";
import { useI18N } from "context/i18n";

export default function Home({ latestComics }) {
  const { trans } = useI18N();

  return (
    <Layout title={"xkcd - comics for developers"}>
      <Container sm>
        <Row>
          <Col>
            <Text h2 css={{ textAlign: "center" }}>
              {trans("LATEST_COMICS")}
            </Text>

            <Grid.Container as="section" gap={2}>
              {latestComics.map((comic) => {
                return (
                  <Grid key={comic.id} xs={12} sm={6} md={3} justify="center">
                    <div>
                      <Text h3 css={{ textAlign: "center" }}>
                        {comic.title}
                      </Text>
                      <Link href={`/comic/${comic.id}`}>
                        <a>
                          <Image
                            width={comic.width}
                            height={comic.height}
                            src={comic.img}
                            alt={comic.alt}
                          />
                        </a>
                      </Link>
                    </div>
                  </Grid>
                );
              })}
            </Grid.Container>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export async function getStaticProps(ctx) {
  const files = await fs.readdir("./comics", { encoding: "utf-8" });
  const lastComicsFiles = files.slice(-8, files.length);

  const promisesReadFiles = lastComicsFiles.map(async (filename) => {
    const content = await fs.readFile(`./comics/${filename}`, {
      encoding: "utf-8",
    });

    return JSON.parse(content);
  });

  const latestComics = await Promise.all(promisesReadFiles);

  return {
    props: { latestComics },
  };
}
