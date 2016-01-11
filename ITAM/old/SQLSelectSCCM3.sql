
domain0
name0
manufacturer0
model0
ResourceID
UserName0

v_GS_COMPUTER_SYSTEM.Name0 as name,
v_GS_COMPUTER_SYSTEM.domain0 as domain,
v_GS_COMPUTER_SYSTEM.Model0 as model,
v_GS_COMPUTER_SYSTEM.Manufacturer0 as manufacturer,
v_GS_COMPUTER_SYSTEM.ResourceID,
v_GS_COMPUTER_SYSTEM.UserName0 as username,
v_GS_COMPUTER_SYSTEM.NumberOfProcessors0 as numberofprocessors,

BASIC
SELECT distinct top 10 
v_GS_COMPUTER_SYSTEM.Name0 as name,
v_GS_COMPUTER_SYSTEM.domain0 as domain,
v_GS_COMPUTER_SYSTEM.Model0 as model,
v_GS_COMPUTER_SYSTEM.Manufacturer0 as manufacturer,
v_GS_COMPUTER_SYSTEM.ResourceID,
v_GS_COMPUTER_SYSTEM.UserName0 as username,
v_GS_COMPUTER_SYSTEM.NumberOfProcessors0 as numberofprocessors
from v_GS_COMPUTER_SYSTEM

v_GS_OPERATING_SYSTEM.Caption0 as caption,

v_GS_SYSTEM_ENCLOSURE.ChassisTypes0 as chassistype,

v_GS_WORKSTATION_STATUS.LastHWScan,

v_GS_COMPUTER_SYSTEM_PRODUCT.IdentifyingNumber0 as SystemSerialNumber,


SELECT

dhcpenabled0,
macaddress0, 
servicename0,
ipaddress0,
ipsubnet0,
defaultipgateway0,
index0,
TimeStamp,
resourceid

FROM v_GS_Network_Adapter_Configuration


size0
FROM v_GS_Disk


NumberofCores0
FROM v_GS_Processor



Caption0
v_GS_Operating_System






SELECT 
v_GS_COMPUTER_SYSTEM.Name0 as name,
v_GS_COMPUTER_SYSTEM.domain0 as domain,
v_GS_COMPUTER_SYSTEM.Model0 as model,
v_GS_COMPUTER_SYSTEM.Manufacturer0 as manufacturer,
v_GS_COMPUTER_SYSTEM.ResourceID,
v_GS_COMPUTER_SYSTEM.UserName0 as username,
v_GS_COMPUTER_SYSTEM.NumberOfProcessors0 as numberofprocessors,
v_GS_SYSTEM.SystemRole0 as SystemRole,
v_GS_OPERATING_SYSTEM.Caption0 as caption,
v_GS_SYSTEM_ENCLOSURE.ChassisTypes0 as chassistype,
v_GS_WORKSTATION_STATUS.LastHWScan, 
v_GS_PC_BIOS.SerialNumber0 as BIOSSerialNumber,
v_GS_COMPUTER_SYSTEM_PRODUCT.IdentifyingNumber0 as SystemSerialNumber,
v_GS_COMPUTER_SYSTEM_PRODUCT.UUID0 as UUIDSerialNumber,
v_GS_SYSTEM_ENCLOSURE.SerialNumber0 as ChassisSerialNumber,
v_GS_BASEBOARD.SerialNumber0 as BaseboardSerialNumber

FROM v_GS_COMPUTER_SYSTEM
LEFT JOIN v_GS_WORKSTATION_STATUS ON v_GS_COMPUTER_SYSTEM.ResourceID = v_GS_WORKSTATION_STATUS.ResourceID 
LEFT JOIN v_GS_SYSTEM ON v_GS_COMPUTER_SYSTEM.ResourceID = v_GS_SYSTEM.ResourceID 
LEFT JOIN v_GS_PC_BIOS ON v_GS_COMPUTER_SYSTEM.ResourceID = v_GS_PC_BIOS.ResourceID
LEFT JOIN v_GS_OPERATING_SYSTEM ON v_GS_COMPUTER_SYSTEM.ResourceID = v_GS_OPERATING_SYSTEM.ResourceID
LEFT JOIN v_GS_COMPUTER_SYSTEM_PRODUCT ON v_GS_COMPUTER_SYSTEM.ResourceID = v_GS_COMPUTER_SYSTEM_PRODUCT.ResourceID
LEFT JOIN v_GS_SYSTEM_ENCLOSURE ON v_GS_COMPUTER_SYSTEM.ResourceID = v_GS_SYSTEM_ENCLOSURE.ResourceID
LEFT JOIN v_GS_BASEBOARD ON v_GS_COMPUTER_SYSTEM.ResourceID = v_GS_BASEBOARD.ResourceID



==========
ITAM SCCM Computer Identity

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
/*v_GS_WORKSTATION_STATUS.LastHWScan,*/
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

SCCM Network Adapter

SELECT DISTINCT
v_GS_Network_Adapter_Configuration.servicename0 as name,
v_GS_Network_Adapter_Configuration.macaddress0 as mac_address, 
v_GS_Network_Adapter_Configuration.ipaddress0 as ip_address,
v_GS_Network_Adapter_Configuration.defaultipgateway0 as ip_default_gateway,
v_GS_Network_Adapter_Configuration.dhcpenabled0 as dhcp_enabled,
v_GS_Network_Adapter_Configuration.ipsubnet0 as netmask,
v_GS_Network_Adapter_Configuration.resourceid as correlation_id
FROM v_GS_Network_Adapter_Configuration
WHERE v_GS_Network_Adapter_Configuration.servicename0 NOT LIKE 'Ras%'
AND v_GS_Network_Adapter_Configuration.servicename0 NOT IN ('', 'AsyncMac', 'NdisWan', 'tapvyprvpn', 'tunnel', 'teamviewervpn', 'BthPan', 'PptpMiniport', 'VBoxNetAdp')