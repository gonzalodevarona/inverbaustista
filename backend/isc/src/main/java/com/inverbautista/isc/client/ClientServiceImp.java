package com.inverbautista.isc.client;

import com.inverbautista.isc.exception.BusinessLogicException;
import com.inverbautista.isc.mercadoPago.payer.PayerDto;
import com.inverbautista.isc.raffle.Raffle;
import com.inverbautista.isc.raffle.RaffleDto;
import com.inverbautista.isc.raffle.RaffleMapper;
import com.inverbautista.isc.raffle.RaffleRepository;
import com.inverbautista.isc.sale.Sale;
import jakarta.transaction.Transactional;
import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;



@Service
public class ClientServiceImp implements IClientService{

    static ClientMapper clientMapper = Mappers.getMapper(ClientMapper.class);


    private ClientRepository clientRepository;

    public ClientServiceImp(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    @Override
    public List<ClientDto> getAllClients(boolean includeSales){
        return convertClientsToDtos(clientRepository.findAll(), includeSales);
    }
    @Override
    public Client getClientEntityById(Long clientId, boolean includeSales) throws BusinessLogicException{

        return clientRepository.findById(clientId).orElseThrow(() -> new BusinessLogicException("client not found with id : " + clientId));
    }
    @Override
    @Transactional
    public Client addClient(ClientDto clientDto) {
        return clientRepository.save(clientMapper.toClient(clientDto));
    }

    @Override
    public ClientDto saveClient(Client client) {
        return convertClientToDto(clientRepository.save(client), false);
    }

    @Override
    @Transactional
    public Client addClientFromPayer(PayerDto payerDto){
        Client client;
        try{
            client = getClientEntityById(Long.valueOf(payerDto.getIdNumber()), false);
        } catch (BusinessLogicException e) {
            client = addClient(new ClientDto(
                    payerDto.getIdType(),
                    Long.valueOf(payerDto.getIdNumber()),
                    payerDto.getName(),
                    payerDto.getSurname(),
                    payerDto.getEmail(),
                    Long.valueOf(payerDto.getPhone()),
                    payerDto.getCountry(),
                    payerDto.getAddress(),
                    payerDto.getAddress(),
                    payerDto.getAddress(),
                    new ArrayList<Sale>()
            ));
        }

        return client;
    }
    @Override
    public List<ClientDto> convertClientsToDtos(List<Client> clients, boolean includeSales) {
        return clients.stream()
                .map(client -> {
                    ClientDto clientDto = convertClientToDto(client, includeSales);
                    return clientDto;
                })
                .collect(Collectors.toList());
    }
    @Override
    public ClientDto convertClientToDto(Client client, boolean includeSales) {

        ClientDto clientDto = clientMapper.fromClient(client);
        if (includeSales) {
            clientDto.setSales(client.getSales());
        }
        return clientDto;
    }



}
