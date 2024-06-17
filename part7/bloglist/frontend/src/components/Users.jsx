import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import userService from '../services/users'
import {
  Container,
  Typography,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Box,
  CircularProgress,
} from '@mui/material'

const Users = () => {
  const {
    data: users,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
  })

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    )
  }

  if (isError) {
    return (
      <Typography gutterBottom variant="h5" component="div">
        There was an error loading the users.
      </Typography>
    )
  }

  return (
    <Container>
      <Typography gutterBottom variant="h4" component="div">
        Users
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Full Name</TableCell>
              <TableCell>Blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link to={user.id}>{user.name}</Link>
                </TableCell>
                <TableCell>{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default Users
