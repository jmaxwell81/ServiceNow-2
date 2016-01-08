/*SCCM Computer Identity */
SELECT DISTINCT
v_GS_COMPUTER_SYSTEM.Name0 as Name,
v_GS_COMPUTER_SYSTEM.domain0 as Dns_Domain,
v_GS_COMPUTER_SYSTEM.Model0 as Model_Id,
v_GS_COMPUTER_SYSTEM.Manufacturer0 as Manufacturer,
v_GS_COMPUTER_SYSTEM.ResourceID as SCCM_ID,
v_GS_COMPUTER_SYSTEM.UserName0 as LastUser,
v_GS_OPERATING_SYSTEM.Caption0 as OperatingSystem,
v_GS_OPERATING_SYSTEM.totalvisiblememorysize0 as RAM,
v_GS_OPERATING_SYSTEM.version0 as OSVersion,
v_GS_WORKSTATION_STATUS.LastHWScan as LastHWScan,
v_GS_SYSTEM_ENCLOSURE.SerialNumber0 as ChassisSerialNumber,
v_GS_PC_BIOS.SerialNumber0 as BIOSSerialNumber,
v_GS_Processor.Name0 as ProcessorName,
v_GS_Processor.NumberofCores0 as NumberofCores,
v_GS_Disk.size0 as Disk_size

FROM v_GS_COMPUTER_SYSTEM
LEFT JOIN v_GS_WORKSTATION_STATUS ON v_GS_COMPUTER_SYSTEM.ResourceID = v_GS_WORKSTATION_STATUS.ResourceID 
LEFT JOIN v_GS_OPERATING_SYSTEM ON v_GS_COMPUTER_SYSTEM.ResourceID = v_GS_OPERATING_SYSTEM.ResourceID
LEFT JOIN v_GS_SYSTEM_ENCLOSURE ON v_GS_COMPUTER_SYSTEM.ResourceID = v_GS_SYSTEM_ENCLOSURE.ResourceID
LEFT JOIN v_GS_Processor ON v_GS_COMPUTER_SYSTEM.ResourceID = v_GS_Processor.ResourceID
LEFT JOIN v_GS_Disk ON v_GS_COMPUTER_SYSTEM.ResourceID = v_GS_Disk.ResourceID
LEFT JOIN v_GS_PC_BIOS ON v_GS_COMPUTER_SYSTEM.ResourceID = v_GS_PC_BIOS.ResourceID