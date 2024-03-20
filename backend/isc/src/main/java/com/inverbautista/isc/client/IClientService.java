package com.inverbautista.isc.client;

import com.inverbautista.isc.exception.BusinessLogicException;
import com.inverbautista.isc.mercadoPago.payer.PayerDto;
import org.springframework.stereotype.Service;

import java.util.List;


public interface IClientService {

    Client getClientEntityById(Long clientId, boolean includeSales) throws BusinessLogicException;
    List<ClientDto> getAllClients(boolean includeSales);
    Client addClient(ClientDto clientDto);
    Client addClientFromPayer(PayerDto payerDto);
    ClientDto saveClient(Client client);

    List<ClientDto> convertClientsToDtos(List<Client> clients, boolean includeSales);

    ClientDto convertClientToDto(Client client, boolean includeSales);
}
