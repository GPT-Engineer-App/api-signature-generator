import { Box, Button, Container, FormControl, FormLabel, Input, Stack, Textarea, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { FaLock } from "react-icons/fa";

// Helper function to calculate HMAC SHA256
const calculateHMAC = (data, key) => {
  // Placeholder for HMAC SHA256 calculation
  return "e97311045a702a41e34da18d792b7a4481b865011e8a7c12775b44c11af0a69a"; // Example result
};

const Index = () => {
  const [formData, setFormData] = useState({
    service_id: "",
    password: "",
    amount: "",
    currency: "",
    operation_id: "",
    payment_id: "",
    by_method: "",
    callback_url: "",
    return_url: "",
    customer: {
      account_number: "",
      name: "",
      email: "",
      phone_number: "",
      address: "",
      remark: "",
    },
    merchant: {
      name: "",
    },
  });

  const [signature, setSignature] = useState("");

  const handleChange = (e, nested = null) => {
    const { name, value } = e.target;
    if (nested) {
      setFormData((prev) => ({
        ...prev,
        [nested]: {
          ...prev[nested],
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleGenerateSignature = () => {
    const { service_id, password, ...rest } = formData;
    let concatenatedString = `${service_id}${password}`;

    Object.values(rest).forEach((value) => {
      if (typeof value === "object") {
        Object.values(value).forEach((val) => {
          concatenatedString += val || "-";
        });
      } else {
        concatenatedString += value || "-";
      }
    });

    const hmacSignature = calculateHMAC(concatenatedString, "asQm98A#@VVz0K6W6$6ayD*F6MekoS");
    setSignature(hmacSignature);
  };

  return (
    <Container maxW="container.md" py="12">
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="6">
        <VStack spacing="4">
          <FormControl id="service_id">
            <FormLabel>Service ID</FormLabel>
            <Input type="text" name="service_id" value={formData.service_id} onChange={handleChange} />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" name="password" value={formData.password} onChange={handleChange} />
          </FormControl>
          {/* Other form controls for the rest of the fields */}
          {/* ... */}
          <Button leftIcon={<FaLock />} colorScheme="blue" onClick={handleGenerateSignature}>
            Generate Signature
          </Button>
          <Textarea value={signature} placeholder="Generated Signature" isReadOnly />
        </VStack>
      </Box>
    </Container>
  );
};

export default Index;
