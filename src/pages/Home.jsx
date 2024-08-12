import { Grid } from '@mui/material'
import ShowItem from '../components/home/homeindex/ShowItem'
function Home() {
  return (
    <Grid container>
      {[
        {
          title: 'Clothes',
          imagePath: '/clothes.jpeg',
          xs: 12,
          height: 'calc(100dvh / 4)',
          link: '/store/clothes',
        },
        {
          title: 'Shoes',
          imagePath: '/shoes.jpg',
          xs: 6,
          height: 'calc(100dvh / 4)',
          link: '/store/shoes',
        },
        {
          title: 'Furniture',
          imagePath: '/furniture.jpg',
          xs: 6,
          height: 'calc(100dvh / 4)',
          link: '/store/furniture',
        },
        {
          title: 'Accessoires',
          imagePath: '/accessories.jpg',
          xs: 6,
          height: 'calc(100dvh / 4)',
          link: '/store/accessories',
        },
        {
          title: 'Techs',
          imagePath: '/tech.webp',
          xs: 6,
          height: 'calc(100dvh / 4)',
          link: '/store/techs',
        },
        {
          title: 'Miscellaneous',
          imagePath: '/miscellaneous.jpeg',
          xs: 12,
          height: 'calc(100dvh / 4)',
          link: '/store/unclassified',
        },
      ].map((c) => (
        <ShowItem key={c.title} {...c} />
      ))}
    </Grid>
  )
}

export default Home
