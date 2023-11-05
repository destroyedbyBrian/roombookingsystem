import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";

const gridStyles = {
  "--Grid-borderWidth": "2px",
  borderTop: "var(--Grid-borderWidth) solid",
  borderLeft: "var(--Grid-borderWidth) solid",
  borderColor: "divider",
  "& > div": {
    borderRight: "var(--Grid-borderWidth) solid",
    borderBottom: "var(--Grid-borderWidth) solid",
    borderColor: "divider",
  },
};

const TimeRoom = () => <div>Time/Room</div>;
const Room1 = () => <div>Room 1</div>;

const TimeSlot = () => <div>8-9am</div>;
const Availability = () => <div>Available</div>;

function generateGridItems(items) {
  return items.map((item, index) => (
    <Grid key={index} {...{ xs: 12, sm: 6, md: 4, lg: 3 }} minHeight={40}>
      <item.component {...item.props} />
    </Grid>
  ));
}

export default function ResourceCalendar() {
  const items = [
    { component: TimeRoom, props: {} },
    { component: Room1, props: {} },

    { component: TimeSlot, props: {} },
    { component: Availability, props: {} },
  ];

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Grid container spacing={2} sx={gridStyles}>
        {generateGridItems(items)}
      </Grid>
    </Box>
  );
}
