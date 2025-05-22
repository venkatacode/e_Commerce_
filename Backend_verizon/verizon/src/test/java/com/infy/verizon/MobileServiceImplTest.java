package com.infy.verizon;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import com.infy.verizon.dto.MobileDTO;
import com.infy.verizon.entity.Mobile;
import com.infy.verizon.expection.EcommerceException;
import com.infy.verizon.repository.MobileRepository;
import com.infy.verizon.service.MobileServiceImpl;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.modelmapper.ModelMapper;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.*;

@ExtendWith(SpringExtension.class)
class MobileServiceImplTest {

	@Mock
	private MobileRepository mobileRepository;

	@Mock
	private ModelMapper modelMapper;

	@InjectMocks
	private MobileServiceImpl mobileService;

	private Mobile mobile;
	private MobileDTO mobileDTO;

	@BeforeEach
	void setUp() {
		MockitoAnnotations.openMocks(this);
		mobile = new Mobile();
		mobile.setMobileId(1);
		mobile.setBrand("Samsung");
		mobile.setModel("Galaxy S21");
		mobile.setPrice(799.99);
		mobileDTO = new MobileDTO();
		mobileDTO.setMobileId(1);
		mobileDTO.setBrand("Samsung");
		mobileDTO.setModel("Galaxy S21");
		mobileDTO.setPrice(799.99);
	}

	@Test
     void testAddMobiles() throws EcommerceException {
        when(modelMapper.map(any(MobileDTO.class), eq(Mobile.class))).thenReturn(mobile);
        when(mobileRepository.save(any(Mobile.class))).thenReturn(mobile);
        when(modelMapper.map(any(Mobile.class), eq(MobileDTO.class))).thenReturn(mobileDTO);

        MobileDTO result = mobileService.addmobiles(mobileDTO);

        assertNotNull(result);
        assertEquals("Samsung", result.getBrand());
        verify(mobileRepository, times(1)).save(any(Mobile.class));
    }

	@Test
	void testGetAllMobiles() throws EcommerceException {
		List<Mobile> mobiles = new ArrayList<>();
		mobiles.add(mobile);
		when(mobileRepository.findAll()).thenReturn(mobiles);

		List<Mobile> result = mobileService.getallmobiles(mobile);

		assertNotNull(result);
		assertFalse(result.isEmpty());
		verify(mobileRepository, times(1)).findAll();
	}

	@Test
     void testGetMobileById_Found() throws EcommerceException {
        when(mobileRepository.findById(1)).thenReturn(Optional.of(mobile));
        when(modelMapper.map(any(Mobile.class), eq(MobileDTO.class))).thenReturn(mobileDTO);

        List<MobileDTO> result = mobileService.getmobilebyId(1, mobile);

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Samsung", result.get(0).getBrand());
        verify(mobileRepository, times(1)).findById(1);
    }

	@Test
     void testGetMobileById_NotFound() {
        when(mobileRepository.findById(1)).thenReturn(Optional.empty());

        Exception exception = assertThrows(EcommerceException.class, () -> {
            mobileService.getmobilebyId(1, mobile);
        });

        assertEquals("MOBILE_NOT_FOUND", exception.getMessage());
        verify(mobileRepository, times(1)).findById(1);
    }

	@Test
	void testGetMobileByBrand_Found() throws EcommerceException {
		List<Mobile> mobiles = new ArrayList<>();
		mobiles.add(mobile);
		when(mobileRepository.findByBrand("Samsung")).thenReturn(mobiles);
		when(modelMapper.map(any(Mobile.class), eq(MobileDTO.class))).thenReturn(mobileDTO);

		List<MobileDTO> result = mobileService.getmobileBybrand("Samsung");

		assertNotNull(result);
		assertFalse(result.isEmpty());
		verify(mobileRepository, times(1)).findByBrand("Samsung");
	}

	@Test
	void testGetMobileByBrand_NotFound() {
		when(mobileRepository.findByBrand("Samsung")).thenReturn(Collections.emptyList());
 
		EcommerceException exception = assertThrows(EcommerceException.class, () ->{
	        mobileService.getmobileBybrand("Samsung");
	    });
 
	    assertEquals("BRAND_NOT_FOUND", exception.getMessage());
   verify(mobileRepository, times(1)).findByBrand("Samsung");
	}

	@Test
	void testGetMobileByColor_Found() throws EcommerceException {
		List<Mobile> mobiles = new ArrayList<>();
		mobiles.add(mobile);
		when(mobileRepository.findByColor("Black")).thenReturn(mobiles);
		when(modelMapper.map(any(Mobile.class), eq(MobileDTO.class))).thenReturn(mobileDTO);

		List<MobileDTO> result = mobileService.getmobileBycolor("Black");

		assertNotNull(result);
		assertFalse(result.isEmpty());
		verify(mobileRepository, times(1)).findByColor("Black");
	}

	@Test
void testGetMobileByColor_NotFound() {
        when(mobileRepository.findByColor("Black")).thenReturn(new ArrayList<>());

        Exception exception = assertThrows(EcommerceException.class, () -> {
            mobileService.getmobileBycolor("Black");
        });

        assertEquals("COLOR_NOT_FOUND", exception.getMessage());
        verify(mobileRepository, times(1)).findByColor("Black");
    }

	@Test
	void testDeleteById() throws EcommerceException {
		doNothing().when(mobileRepository).deleteById(1);

		mobileService.deletebyId(1);

		verify(mobileRepository, times(1)).deleteById(1);
	}

	@Test
	void testUpdateMobileData() throws EcommerceException {
		Mobile newMobile = new Mobile();
		newMobile.setBrand("Samsung");
		newMobile.setModel("Galaxy S22");
		newMobile.setPrice(899.99);

		when(mobileRepository.findById(1)).thenReturn(Optional.of(mobile));
		when(mobileRepository.save(any(Mobile.class))).thenReturn(newMobile);

		mobileService.updatemobileData(1, newMobile);

		assertEquals("Samsung", newMobile.getBrand());
		assertEquals("Galaxy S22", newMobile.getModel());
		verify(mobileRepository, times(1)).save(any(Mobile.class));
	}

	@Test
	void testUpdateMobileData_NotFound() {
		Mobile newMobile = new Mobile();
		newMobile.setBrand("Samsung");
		newMobile.setModel("Galaxy S22");
		newMobile.setPrice(899.99);

		when(mobileRepository.findById(1)).thenReturn(Optional.empty());

		Exception exception = assertThrows(EcommerceException.class, () -> {
			mobileService.updatemobileData(1, newMobile);
		});

		assertEquals("MOBILE_ID_NOT_FOUND", exception.getMessage());
		verify(mobileRepository, times(1)).findById(1);
	}
}
