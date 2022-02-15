import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalOverlay>
        <ModalContent
          my="auto"
          bgColor="transparent"
          maxWidth={900}
          width="auto"
        >
          <ModalBody p="0" width="100%">
            <Image
              maxW="900px"
              maxH="600px"
              width="auto"
              height="auto"
              src={imgUrl}
            />
          </ModalBody>
          <ModalFooter bgColor="pGray.800" borderBottomRadius="0.5rem">
            <Link mr="auto" href={imgUrl} isExternal>
              Abrir original
            </Link>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
}
