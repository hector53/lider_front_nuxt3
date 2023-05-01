<template>
  <div class=" tableDashboard container max-w-8xl py-3 mt-7 mx-auto flex flex-col">
    <div class="optionsTable flex justify-between">
      <div class="flex">
        <button class="btnContentHeader1 mr-5">
          <img src="~/assets/playground_assets/calendarline4865-l7i.svg?url" />
          <span> Date range </span>
        </button>
        <button class="btnContentHeader1 mr-5">
          <img src="~/assets/playground_assets/flagline4865-rck.svg?url" />
          <span> Status </span>
        </button>
      </div>
      
      <div class="input-search-tables">
        <img
          src="~/assets/playground_assets/search2line4865-uffr.svg?url"
        />
        <input type="search" class="search-input" placeholder="Search by site" >
      </div>
    </div>
    
<div class="relative overflow-x-auto  mt-10">
    <table class="w-full text-sm text-left">
        <thead class=" uppercase">
            <tr>
                <th scope="col" class="px-6 py-3">
                    order
                </th>
                <th scope="col" class="px-6 py-3">
                    creation date
                </th>
                <th scope="col" class="px-6 py-3">
                    invoice
                </th>
                <th scope="col" class="px-6 py-3">
                    processor
                </th>
                <th scope="col" class="px-6 py-3">
                    currency
                </th>
                <th scope="col" class="px-6 py-3">
                    gross amount
                </th>
                <th scope="col" class="px-6 py-3">
                    fees
                </th>
                <th scope="col" class="px-6 py-3">
                    net amount
                </th>
                <th scope="col" class="px-6 py-3">
                    receive url
                </th>
            </tr>
        </thead>
        <tbody>
            <tr class=" hover:bg-gray-50 ">
                <th scope="row" class="px-6 py-4  ">
                  01
                </th>
                <td class="px-6 py-4">
                    Jan 17, 2:43 PM
                </td>
                <td class="px-6 py-4">
                    5410-ayy93aWF8duJVDlgmmoPNkLt6RN30
                </td>
                <td class="px-6 py-4 text-center">
                    <div class="flex items-center">
                        <icon-processor :processor="'stripe'"></icon-processor>
                        <span>Stripe</span>
                    </div>
                </td>
                <td class="px-6 py-4 text-center">
                    USD
                </td>
                <td class="px-6 py-4 text-center">
                   4
                </td>
                <td class="px-6 py-4 text-center">
                   0.6
                </td>
                <td class="px-6 py-4 text-center">
                   0.6
                </td>
                <td class="px-6 py-4 text-center">
                   Receipt
                </td>
            </tr>
            <tr class=" hover:bg-gray-50 ">
                <th scope="row" class="px-6 py-4  ">
                  01
                </th>
                <td class="px-6 py-4">
                    Jan 17, 2:43 PM
                </td>
                <td class="px-6 py-4">
                    5410-ayy93aWF8duJVDlgmmoPNkLt6RN30
                </td>
                <td class="px-6 py-4">
                    <div class="flex items-center">
                        <icon-processor :processor="'paypal'"></icon-processor>
                        <span>Paypal</span>
                    </div>
                </td>
                <td class="px-6 py-4 text-center">
                    USD
                </td>
                <td class="px-6 py-4 text-center">
                   4
                </td>
                <td class="px-6 py-4 text-center">
                   0.6
                </td>
                <td class="px-6 py-4 text-center">
                   0.6
                </td>
                <td class="px-6 py-4 text-center">
                   Receipt
                </td>
            </tr>
            <tr class=" hover:bg-gray-50 ">
                <th scope="row" class="px-6 py-4  ">
                  01
                </th>
                <td class="px-6 py-4">
                    Jan 17, 2:43 PM
                </td>
                <td class="px-6 py-4">
                    5410-ayy93aWF8duJVDlgmmoPNkLt6RN30
                </td>
                <td class="px-6 py-4">
                    <div class="flex items-center">
                        <icon-processor :processor="'coinbase'"></icon-processor>
                        <span>Coinbase</span>
                    </div>
                </td>
                <td class="px-6 py-4 text-center">
                    USD
                </td>
                <td class="px-6 py-4 text-center">
                   4
                </td>
                <td class="px-6 py-4 text-center">
                   0.6
                </td>
                <td class="px-6 py-4 text-center">
                   0.6
                </td>
                <td class="px-6 py-4 text-center">
                   Receipt
                </td>
            </tr>
            
        </tbody>
    </table>
</div>

  </div>
</template>

<script setup></script>
